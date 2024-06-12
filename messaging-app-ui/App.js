import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import "./styles.css";

const App = () => {
  return (
    <View className="flex flex-grow justify-center items-center bg-white">
      <Text>Hello world!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
