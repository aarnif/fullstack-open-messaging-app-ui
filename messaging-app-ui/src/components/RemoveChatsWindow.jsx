import { Pressable, View, Text } from "react-native";

const RemoveChatsWindow = ({ handleRemoveChats }) => {
  return (
    <View className="bg-slate-300 shadow-lg dark:bg-slate-600 z-10">
      <View className="w-full flex justify-center items-center py-4 bg-slate-300">
        <View className="w-full px-4 flex flex-col">
          <Pressable
            onPress={handleRemoveChats}
            className="w-full flex-grow max-h-[60px] p-2 flex flex-row justify-center items-center border-2 border-slate-200 bg-slate-200 rounded-xl 
        dark:border-slate-500 dark:bg-slate-500"
          >
            <Text className="ml-2 text-xl font-bold text-slate-700 dark:text-slate-200">
              Delete Chats
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RemoveChatsWindow;
