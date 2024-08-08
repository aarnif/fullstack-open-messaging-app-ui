import { Modal, SafeAreaView, View, Text } from "react-native";

const Notify = ({ notify }) => {
  console.log("Notify:", notify);

  if (!notify || !notify.message) {
    return null;
  }

  const { message, show } = notify;

  return (
    <Modal
      visible={message ? true : false}
      animationType="slide"
      transparent={true}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: "10%",
            marginTop: "auto",
            backgroundColor: message.isError
              ? "rgba(220, 38, 38, 0.5)"
              : "rgba(22, 163, 74, 0.5)",
          }}
          className="w-full flex justify-center items-center"
        >
          <View className="w-full p-4 rounded-xl flex justify-center items-center">
            <Text
              style={{ color: message.isError ? "#dc2626" : "#16a34a" }}
              className="text-2xl font-bold"
            >
              {message.content}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Notify;
