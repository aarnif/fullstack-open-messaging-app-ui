import { GET_CHATS_BY_USER } from "../../graphql/queries";

import Header from "../Header";
import SearchBar from "../SearchBar";
import ChatItem from "./ChatItem";
import SelectChatItem from "./SelectChatItem";
import LoadingIcon from "../LoadingIcon";
import Menu from "../Menu";

import useSubscriptions from "../../hooks/useSubscriptions";

import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";

const ChatsHeader = ({ searchByTitle, handleChange, handlePress }) => {
  return (
    <View className="w-full bg-white dark:bg-slate-700">
      <View className="flex flex-row justify-between items-end">
        <Text className="text-2xl font-bold mt-4 mx-4 mb-2 dark:text-slate-200">
          Chats
        </Text>
        <Pressable onPress={handlePress}>
          <Text className="text-lg font-bold mt-4 mx-4 mb-2 dark:text-slate-200">
            Select
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
  const [chosenChatIds, setChosenChatIds] = useState([]);
  const [selectChatsView, setSelectChatsView] = useState(false);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [debouncedSearchByTitle] = useDebounce(searchByTitle, 500);
  const { data, loading } = useQuery(GET_CHATS_BY_USER, {
    variables: {
      userId: user.id,
      searchByTitle: debouncedSearchByTitle,
    },
  });

  console.log("Rendering Chats component...");

  useSubscriptions(user);

  // console.log("Chats data:", data);

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByTitle(text);
  };

  const handlePress = () => {
    console.log("Press select button");
    setSelectChatsView(!selectChatsView);
  };

  return (
    <>
      <Header user={user} handlePress={handleNewChatPress} />
      <ChatsHeader
        searchByTitle={searchByTitle}
        handleChange={handleChange}
        handlePress={handlePress}
      />
      {loading ? (
        <View className="flex justify-end items-center">
          <LoadingIcon />
        </View>
      ) : (
        <ChatsList
          user={user}
          data={data?.allChatsByUser}
          selectChatsView={selectChatsView}
          chosenChatIds={chosenChatIds}
          setChosenChatIds={setChosenChatIds}
        />
      )}
      {user && <Menu />}
    </>
  );
};

export default Chats;
