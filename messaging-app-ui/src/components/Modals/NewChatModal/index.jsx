import {
  GET_CONTACTS_BY_USER,
  GET_CHAT_BY_PARTICIPANTS,
} from "../../../graphql/queries";
import { CREATE_CHAT } from "../../../graphql/mutations";
import LoadingIcon from "../../LoadingIcon";
import Header from "./Header";
import SearchBar from "../../SearchBar";
import SelectContactsList from "../../SelectContactsList";

import useNewChatModalHeaderAnimation from "../../../hooks/useNewChatModalHeaderAnimation";
import useNotifyMessage from "../../../hooks/useNotifyMessage";

import { Modal, SafeAreaView, View, Text, TextInput } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useColorScheme } from "nativewind";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";

import { animated } from "@react-spring/native";

const SearchBarContainer = ({ searchByTitle, handleChange }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="py-2 w-full bg-white dark:bg-slate-700">
      <SearchBar
        placeholder={"Search by name..."}
        placeholderTextColor={colorScheme === "dark" ? "white" : "#475569"}
        searchByTitle={searchByTitle}
        handleChange={handleChange}
      />
    </View>
  );
};

const NewChatModal = ({ user, showNewChatModal, setShowNewChatModal }) => {
  const notifyMessage = useNotifyMessage();
  const [isChatTypeGroup, setChatType] = useState(false);
  const [chosenUsersIds, setChosenUsersIds] = useState([]);
  const [groupChatTitle, setGroupChatTitle] = useState("");
  const [groupChatDescription, setGroupChatDescription] = useState("");
  const [searchByName, setSearchByName] = useState("");
  const [debouncedSearchByName] = useDebounce(searchByName, 500);
  const { colorScheme } = useColorScheme();

  console.log("Is group chat:", isChatTypeGroup);
  console.log("Chosen users:", chosenUsersIds);
  console.log();

  const { springsHeader, springsTextInput } = useNewChatModalHeaderAnimation({
    chosenUsersIds,
    isChatTypeGroup,
    setChatType,
  });

  const res1 = useQuery(GET_CONTACTS_BY_USER, {
    variables: {
      searchByName: debouncedSearchByName,
    },
  });

  const res2 = useQuery(GET_CHAT_BY_PARTICIPANTS, {
    variables: {
      participants: [user.id, ...chosenUsersIds],
    },
  });

  const [mutate] = useMutation(CREATE_CHAT, {
    onError: (error) => {
      console.log("Error creating chat mutation:");
      console.log(error.graphQLErrors[0].message);
      notifyMessage.show({
        content: error.graphQLErrors[0].message,
        isError: true,
      });
    },
  });

  const navigate = useNavigate();

  const handlePress = async () => {
    console.log("Press create a new chat!");
    console.log("Chosen users:", chosenUsersIds);

    // Check if user already has a chat with this contact and navigate to it
    if (res2.data?.findChatByParticipants) {
      console.log("Chat exists:", res2.data.findChatByParticipants);
      navigate(`/chats/${res2.data.findChatByParticipants.id}`);
      setShowNewChatModal(false);
      return;
    }

    try {
      const { data, error } = await mutate({
        variables: {
          title: groupChatTitle,
          description: groupChatDescription,
          participants: [user.id, ...chosenUsersIds],
        },
      });
      console.log("Data:", data);

      if (data) {
        console.log("Created chat:", data);
        navigate(`/chats/${data.createChat.id}`);
        setShowNewChatModal(false);
      }
    } catch (error) {
      console.log("Error creating chat:", error);
      console.log(error.message);
    }
  };

  //   console.log("Contacts data:", data);

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByName(text);
  };

  return (
    <Modal animationType="slide" visible={showNewChatModal}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <Header
          showNewChatModal={showNewChatModal}
          setShowNewChatModal={setShowNewChatModal}
          chosenUsersIds={chosenUsersIds}
          handlePress={handlePress}
          springsHeader={springsHeader}
        />

        <SearchBarContainer
          searchByTitle={searchByName}
          handleChange={handleChange}
        />
        {res1.loading ? (
          <View className="flex-grow flex justify-start items-center bg-white dark:bg-slate-700">
            <LoadingIcon />
          </View>
        ) : (
          <SelectContactsList
            user={user}
            data={res1.data?.allContactsByUser.contacts}
            chosenUsersIds={chosenUsersIds}
            setChosenUsersIds={setChosenUsersIds}
          />
        )}

        <animated.View
          style={{
            opacity: springsTextInput.opacity,
            display: springsTextInput.display,
            transform: [
              {
                translateY: springsTextInput.translateY,
              },
            ],
          }}
          className="w-full bg-white shadow-lg dark:bg-slate-700"
        >
          <View className="mx-4 my-4">
            <View className="w-full flex justify-center items-center pb-2">
              <Text className="text-sm text-slate-800 font-bold dark:text-slate-100">
                {`${chosenUsersIds.length} contacts selected`}
              </Text>
            </View>
            <View className="w-full flex-grow flex-row max-h-[50px] p-2 mb-2 rounded-lg bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-100">
              <MaterialCommunityIcons
                size={24}
                color={colorScheme === "dark" ? "white" : "#475569"}
                name="chat-outline"
              />
              <TextInput
                className="w-full pl-2 dark:text-slate-100"
                editable={chosenUsersIds.length > 1}
                selectTextOnFocus={chosenUsersIds.length > 1}
                value={groupChatTitle}
                placeholder={"Enter group chat title..."}
                placeholderTextColor={
                  colorScheme === "dark" ? "white" : "#475569"
                }
                onChangeText={(text) => setGroupChatTitle(text)}
              />
            </View>
            <View className="w-full flex-grow flex-row max-h-[50px] p-2 rounded-lg bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-100">
              <MaterialCommunityIcons
                size={24}
                color={colorScheme === "dark" ? "white" : "#475569"}
                name="text-box-outline"
              />
              <TextInput
                className="w-full pl-2 dark:text-slate-100"
                editable={chosenUsersIds.length > 1}
                selectTextOnFocus={chosenUsersIds.length > 1}
                value={groupChatDescription}
                placeholder={"Enter group chat description..."}
                placeholderTextColor={
                  colorScheme === "dark" ? "white" : "#475569"
                }
                onChangeText={(text) => setGroupChatDescription(text)}
              />
            </View>
          </View>
        </animated.View>
      </SafeAreaView>
    </Modal>
  );
};

export default NewChatModal;
