import ChatMembersList from "./ChatMembersList";

import { View, Text, Pressable, Image } from "react-native";

const GroupChatInfo = ({
  user,
  chat,
  chatAdmin,
  leaveChat,
  handlePressAddMembers,
  handlePressRemoveMembers,
  setShowImageViewModal,
}) => {
  return (
    <>
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
      <ChatMembersList data={chat.participants} admin={chatAdmin} />
      {user.id !== chatAdmin.id && (
        <View className="w-full p-4 flex justify-center items-start bg-white dark:bg-slate-700">
          <Pressable
            onPress={leaveChat}
            className="mb-8 w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-red-400 bg-red-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-slate-200">Leave Chat</Text>
          </Pressable>
        </View>
      )}
      {user.id === chatAdmin.id && (
        <>
          <View className="w-full px-4 pt-4 pb-2 flex justify-center items-start bg-white dark:bg-slate-700">
            <Pressable
              onPress={handlePressAddMembers}
              className="mb-2 w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-slate-200 bg-slate-200 rounded-xl 
        dark:border-slate-500 dark:bg-slate-500"
            >
              <Text className="text-xl font-bold text-slate-700 dark:text-slate-200">
                Add Members
              </Text>
            </Pressable>
          </View>
          <View className="w-full px-4 py-2 flex justify-center items-start bg-white dark:bg-slate-700">
            <Pressable
              onPress={handlePressRemoveMembers}
              className="mb-2 w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-slate-200 bg-slate-200 rounded-xl 
        dark:border-slate-500 dark:bg-slate-500"
            >
              <Text className="text-xl font-bold text-slate-700 dark:text-slate-200">
                Remove Members
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  );
};

export default GroupChatInfo;
