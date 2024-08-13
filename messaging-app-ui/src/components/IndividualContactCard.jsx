import { View, Text, Pressable, Image } from "react-native";

const IndividualContactCard = ({
  contact,
  isBlocked,
  haveContactBlockedYou,
  setShowImageViewModal,
}) => {
  return (
    <View className="w-full py-4 flex justify-center items-center bg-white dark:bg-slate-700">
      <Pressable onPress={() => setShowImageViewModal(true)}>
        <Image
          source={{
            uri: contact.image.thumbnail,
          }}
          style={{ width: 120, height: 120, borderRadius: 9999 }}
        />
      </Pressable>
      <Text className="mt-4 text-xl text-slate-800 font-bold dark:text-slate-100">
        {contact.name}
      </Text>
      <Text className="text-md text-slate-500 font-bold dark:text-slate-300">
        @{contact.username}
      </Text>
      <Text className="mt-4 text-base text-slate-700 dark:text-slate-100">
        {contact.about}
      </Text>

      {isBlocked && (
        <View className="mt-2 w-full flex-grow max-h-[60px] flex flex-row justify-center items-center p-2 rounded-xl">
          <Text className="text-xl text-red-600 font-bold">
            You have blocked this contact!
          </Text>
        </View>
      )}
      {haveContactBlockedYou && (
        <View className="mt-2 w-full flex-grow max-h-[60px] flex flex-row justify-center items-center p-2 rounded-xl">
          <Text className="text-xl text-red-600 font-bold">
            This contact has blocked you!
          </Text>
        </View>
      )}
    </View>
  );
};

export default IndividualContactCard;
