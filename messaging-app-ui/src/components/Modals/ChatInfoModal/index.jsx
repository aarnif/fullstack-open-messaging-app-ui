import ContactsList from "./ContactsList";
import { LEAVE_GROUP_CHAT } from "../../../graphql/mutations";
import ImageViewModal from "../ImageViewModal/index.jsx";
import EditChatModal from "../EditChatModal/index.jsx";
import AddMembersModal from "../UpdateMembersModal/AddMembersModal.jsx";
import RemoveMembersModal from "../UpdateMembersModal/RemoveMembersModal.jsx";

import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ChatInfoModal = ({
  user,
  chat,
  showChatInfoModal,
  setShowChatInfoModal,
}) => {
  console.log("User:", user);
  const chatAdmin = chat.admin;

  const [showEditChat, setShowEditChat] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showRemoveMembersModal, setShowRemoveMembersModal] = useState(false);

  const [showImageViewModal, setShowImageViewModal] = useState(false);
  const [mutate] = useMutation(LEAVE_GROUP_CHAT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const navigate = useNavigate();

  const goBack = () => {
    console.log("Go back to chats page!");
    setShowChatInfoModal(false);
  };

  const leaveChat = async () => {
    console.log("Leave group chat:", chat.title);
    try {
      await mutate({
        variables: { chatId: chat.id, participantId: user.id },
      });
      console.log("Left group chat:", chat.title);
      navigate("/chats");
    } catch (error) {
      console.log("Error leaving chat:", error);
      console.log(error);
    }
  };

  const handlePressEditChat = () => {
    console.log("Edit chat!");
    setShowEditChat(true);
  };

  const handlePressAddMembers = () => {
    console.log("Add members to chat!");
    setShowAddMembersModal(true);
  };

  const handlePressRemoveMembers = () => {
    console.log("Remove members from chat!");
    setShowRemoveMembersModal(true);
  };

  return (
    <Modal animationType="slide" visible={showChatInfoModal}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
          <View className="flex flex-row">
            <View className="w-[50px] mr-4 flex-grow flex justify-center items-center">
              <Pressable onPress={goBack}>
                <MaterialCommunityIcons
                  name={"chevron-left"}
                  size={36}
                  color={"white"}
                />
              </Pressable>
            </View>

            <View className="max-w-[250px] flex-grow flex flex-row justify-center items-center">
              <View>
                <Text className="text-xl text-white font-bold">Chat Info</Text>
              </View>
            </View>

            <View className="w-[50px] ml-4 flex-grow flex justify-center items-center">
              {user.id === chatAdmin.id && (
                <Pressable onPress={handlePressEditChat}>
                  <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
                    <MaterialCommunityIcons
                      name={"plus"}
                      size={24}
                      color={"white"}
                    />
                  </View>
                </Pressable>
              )}
            </View>
          </View>
        </View>
        <View className="w-full py-4 flex justify-center items-center bg-white dark:bg-slate-700">
          <Pressable onPress={() => setShowImageViewModal(true)}>
            <Image
              source={{
                uri: chat.image.thumbnail,
              }}
              style={{ width: 100, height: 100, borderRadius: 9999 }}
            />
          </Pressable>
          <Text className="pt-4 text-xl text-slate-800 font-bold dark:text-slate-100">
            {chat.title}
          </Text>
          <Text className="mx-8 text-sm text-slate-800 text-center dark:text-slate-200">
            {!chat.description.length ? "No description" : chat.description}
          </Text>
        </View>
        <View className="w-full py-2 flex justify-center items-start bg-white dark:bg-slate-700">
          <Text className="mx-4 text-xl text-slate-800 font-bold dark:text-slate-100">
            {`${chat.participants.length} members`}
          </Text>
        </View>
        <ContactsList data={chat.participants} admin={chatAdmin} />
        {user.id !== chatAdmin.id && (
          <View className="w-full p-4 flex justify-center items-start bg-white dark:bg-slate-700">
            <Pressable
              onPress={leaveChat}
              className="mb-8 w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-red-400 bg-red-400 rounded-xl"
            >
              <Text className="text-xl font-bold text-slate-200">
                Leave Chat
              </Text>
            </Pressable>
          </View>
        )}
        {user.id === chatAdmin.id && (
          <>
            <View className="w-full px-4 py-2 flex justify-center items-start bg-white dark:bg-slate-700">
              <Pressable
                onPress={handlePressAddMembers}
                className="w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-green-400 bg-green-400 rounded-xl"
              >
                <Text className="text-xl font-bold text-slate-200">
                  Add Members
                </Text>
              </Pressable>
            </View>
            <View className="w-full px-4 py-2 flex justify-center items-start bg-white dark:bg-slate-700">
              <Pressable
                onPress={handlePressRemoveMembers}
                className="w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-red-400 bg-red-400 rounded-xl"
              >
                <Text className="text-xl font-bold text-slate-200">
                  Remove Members
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </SafeAreaView>
      {showImageViewModal && (
        <ImageViewModal
          type={"chat"}
          data={chat}
          setShowImageViewModal={setShowImageViewModal}
        />
      )}
      {showEditChat && (
        <EditChatModal
          chat={chat}
          showEditChat={showEditChat}
          setShowEditChat={setShowEditChat}
        />
      )}
      {showAddMembersModal && (
        <AddMembersModal
          user={user}
          chat={chat}
          showAddMembersModal={showAddMembersModal}
          setShowAddMembersModal={setShowAddMembersModal}
        />
      )}
      {showRemoveMembersModal && (
        <RemoveMembersModal
          user={user}
          chat={chat}
          showRemoveMembersModal={showRemoveMembersModal}
          setShowRemoveMembersModal={setShowRemoveMembersModal}
        />
      )}
    </Modal>
  );
};

export default ChatInfoModal;
