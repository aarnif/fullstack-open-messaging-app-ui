import { Alert } from "react-native";

const confirmAlert = (title, message, callback) =>
  Alert.alert(title, message, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: callback },
  ]);

export default confirmAlert;
