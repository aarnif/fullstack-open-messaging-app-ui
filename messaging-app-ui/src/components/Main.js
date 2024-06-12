import Header from "./Header";
import Hello from "./Hello";

import { View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

const Main = () => {
  return (
    <View className="flex flex-grow justify-center items-center">
      <Header />
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
