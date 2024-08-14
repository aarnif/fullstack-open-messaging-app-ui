import useNotifyMessage from "../hooks/useNotifyMessage";
import { Modal, SafeAreaView, View, Text } from "react-native";

const NotifyMessage = () => {
  const notifyMessage = useNotifyMessage();

  if (!notifyMessage || !notifyMessage.content) {
    return null;
  }

  const { content, show } = notifyMessage;

  console.log("Show notify message:", notifyMessage.content);

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
              ? "rgba(153, 27, 27, 0.8)"
              : "rgba(22, 101, 52, 0.8)",
          }}
          className="w-full flex justify-center items-center"
        >
          <View className="w-full p-4 rounded-xl flex justify-center items-center">
            <Text
              style={{ color: content.isError ? "#ef4444" : "#22c55e" }}
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
