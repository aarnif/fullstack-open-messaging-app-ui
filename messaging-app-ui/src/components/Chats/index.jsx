import { GET_CHATS_BY_USER } from "../../graphql/queries";
import { LEAVE_GROUP_CHATS } from "../../graphql/mutations";
import useNotifyMessage from "../../hooks/useNotifyMessage";
import confirmAlert from "../confirmAlert";

import Header from "../Header";
import SearchBar from "../SearchBar";
import ChatItem from "./ChatItem";
import SelectChatItem from "./SelectChatItem";
import LoadingIcon from "../LoadingIcon";
import LoadingIconWithOverlay from "../LoadingIconWithOverlay";
import Menu from "../Menu";
import RemoveChatsWindow from "../RemoveChatsWindow";

import useSubscriptions from "../../hooks/useSubscriptions";

import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { useDebounce } from "use-debounce";

const ChatsHeader = ({
  searchByTitle,
  handleChange,
  handlePress,
  selectChatsView,
  chosenChatIds,
}) => {
  return (
    <View className="w-full bg-white dark:bg-slate-700">
      <View className="flex flex-row justify-between items-end">
        <Text
          style={{ fontSize: selectChatsView ? "18px" : "24px" }}
          className="text-2xl font-bold mt-4 mx-4 mb-2 dark:text-slate-200"
        >
          {selectChatsView ? `${chosenChatIds.length} selected` : "Chats"}
        </Text>
        <Pressable onPress={handlePress}>
          <Text className="text-lg font-bold mt-4 mx-4 mb-2 dark:text-slate-200">
            {selectChatsView ? "Done" : "Select"}
          </Text>
        </Pressable>
      </View>
      <SearchBar
        placeholder={"Search by title..."}
        searchByTitle={searchByTitle}
        handleChange={handleChange}
      />
    </View>
  );
};

const ChatsList = ({
  user,
  data,
  selectChatsView,
  chosenChatIds,
  setChosenChatIds,
}) => {
  if (!data.length) {
    return (
      <View className="flex justify-start items-center">
        <Text className="mt-8 text-2xl font-bold text-slate-200">
          No chats found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      className="w-full"
      data={data}
      renderItem={({ item }) => {
        return selectChatsView ? (
          <SelectChatItem
            user={user}
            item={item}
            chosenChatIds={chosenChatIds}
            setChosenChatIds={setChosenChatIds}
          />
        ) : (
          <ChatItem user={user} item={item} />
        );
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

const Chats = ({ user, handleNewChatPress }) => {
  const notifyMessage = useNotifyMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [chosenChatIds, setChosenChatIds] = useState([]);
  const [selectChatsView, setSelectChatsView] = useState(false);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [debouncedSearchByTitle] = useDebounce(searchByTitle, 500);

  const { data, loading } = useQuery(GET_CHATS_BY_USER, {
    variables: {
      searchByTitle: debouncedSearchByTitle,
    },
  });

  const [leaveGroupChats] = useMutation(LEAVE_GROUP_CHATS, {
    onError: (error) => {
      console.log("Error removing group chats:");
      console.log(error.graphQLErrors[0].message);
      notifyMessage.show({
        content: error.graphQLErrors[0].message,
        isError: true,
      });
    },
  });

  useSubscriptions(user);

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByTitle(text);
  };

  const handlePress = () => {
    console.log("Press select button");
    setSelectChatsView(!selectChatsView);
    setChosenChatIds([]);
  };

  const handleRemoveChats = async () => {
    console.log("Delete chats button pressed!");
    console.log("Chosen chat ids:", chosenChatIds);

    if (!chosenChatIds.length) {
      notifyMessage.show({
        content: "No chats selected!",
        isError: true,
      });
      return;
    }

    try {
      setSelectChatsView(false);
      setIsLoading(true);
      await leaveGroupChats({
        variables: {
          chatIds: chosenChatIds,
        },
      });
      notifyMessage.show({
        content: "Chats deleted!",
        isError: false,
      });
    } catch (error) {
      console.log("Error removing group chats:", error);
      console.log(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header user={user} handlePress={handleNewChatPress} />
      <ChatsHeader
        searchByTitle={searchByTitle}
        handleChange={handleChange}
        handlePress={handlePress}
        selectChatsView={selectChatsView}
        chosenChatIds={chosenChatIds}
      />
      {loading ? (
        <View className="flex justify-end items-center">
          <LoadingIcon />
        </View>
      ) : (
        <>
          <ChatsList
            user={user}
            data={data?.allChatsByUser}
            selectChatsView={selectChatsView}
            chosenChatIds={chosenChatIds}
            setChosenChatIds={setChosenChatIds}
          />

          <RemoveChatsWindow
            selectChatsView={selectChatsView}
            handleRemoveChats={() =>
              confirmAlert(
                "Remove Chats?",
                "Are you sure you want to remove these chats?",
                handleRemoveChats
              )
            }
          />
        </>
      )}
      {user && <Menu />}
      {isLoading && (
        <LoadingIconWithOverlay loadingMessage={"Removing chats..."} />
      )}
    </>
  );
};

export default Chats;
