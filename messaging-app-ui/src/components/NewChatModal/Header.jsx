import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { animated } from "@react-spring/native";

const Header = ({
  showNewChatModal,
  setShowNewChatModal,
  chosenUsersIds,
  handlePress,
  springsHeader,
}) => {
  return (
    <>
      <animated.View
        style={{
          transform: [{ translateX: springsHeader.translateX }],
        }}
        className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg"
      >
        <View className="w-[70px] flex justify-center items-center">
          <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
            <Pressable onPress={() => setShowNewChatModal(!showNewChatModal)}>
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View className="flex-grow flex justify-center items-center">
          <Text className="text-xl text-white font-bold">
            {chosenUsersIds.length > 1
              ? "New Group Chat"
              : "New Individual Chat"}
          </Text>
        </View>
        <View className="w-[70px] flex justify-center items-center">
          <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
            <Pressable onPress={handlePress}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="white"
              />
            </Pressable>
          </View>
        </View>
      </animated.View>

      <animated.View className="w-full bg-green-600 flex justify-center items-center py-2">
        <Text className="text-sm text-white font-bold">
          {`${chosenUsersIds.length} contacts selected`}
        </Text>
      </animated.View>
    </>
  );
};

export default Header;
