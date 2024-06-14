import { View, Text } from "react-native";

const Notify = ({ notify }) => {
  console.log("Notify:", notify);

  if (!notify || !notify.message) {
    return null;
  }

  const { message, show } = notify;

  return (
    <View className="w-full pt-4 px-8 flex justify-center items-center">
      <View
        style={{ backgroundColor: message.isError ? "#f87171" : "#4ade80" }}
        className="w-full p-4 rounded-xl flex justify-center items-center"
      >
        <Text
          style={{ color: message.isError ? "#dc2626" : "#16a34a" }}
          className="text-md"
        >
          {message.content}
        </Text>
      </View>
    </View>
  );
};

export default Notify;
