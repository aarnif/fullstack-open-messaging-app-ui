import useNotifyMessage from "../hooks/useNotifyMessage";
import { Modal, SafeAreaView, View, Text } from "react-native";

const NotifyMessage = () => {
  const notifyMessage = useNotifyMessage();

  console.log("Notify:", notifyMessage);

  if (!notifyMessage || !notifyMessage.content) {
    return null;
  }

  const { content, show } = notifyMessage;

  return (
    <Modal
      visible={content ? true : false}
      animationType="slide"
      transparent={true}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: "10%",
            marginTop: "auto",
            backgroundColor: content.isError
              ? "rgba(220, 38, 38, 0.5)"
              : "rgba(22, 163, 74, 0.5)",
          }}
          className="w-full flex justify-center items-center"
        >
          <View className="w-full p-4 rounded-xl flex justify-center items-center">
            <Text
              style={{ color: content.isError ? "#dc2626" : "#16a34a" }}
              className="text-2xl font-bold"
            >
              {content.content}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NotifyMessage;
