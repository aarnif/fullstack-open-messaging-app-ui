import { BLOCK_OR_UNBLOCK_CONTACT } from "../../../graphql/mutations";

import { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";

import { useMutation } from "@apollo/client";

const IndividualChatInfo = ({
  user,
  chat,
  setShowImageViewModal,
  setShowChatInfoModal,
}) => {
  const getAnotherParticipant = chat.participants.filter(
    (participant) => participant.id !== user.id
  )[0];

  const [contact, setContact] = useState(getAnotherParticipant);
  const [isBlocked, setIsBlocked] = useState(
    user.blockedContacts.includes(getAnotherParticipant.id)
  );

  const [blockOrUnBlockContact] = useMutation(BLOCK_OR_UNBLOCK_CONTACT, {
    onError: (error) => {
      console.log("Error blocking contact mutation:");
      console.log(error.graphQLErrors[0].message);
    },
  });

  const haveContactBlockedYou = contact?.blockedContacts.includes(user.id);

  const handleChat = async () => {
    console.log("Press chat button!");
    setShowChatInfoModal(false);
  };

  const handleBlockContact = async () => {
    console.log("Press block/unblock contact button!");

    try {
      const { data, error } = await blockOrUnBlockContact({
        variables: {
          contactId: contact.id,
        },
      });

      const isContactBlocked = data.blockOrUnBlockContact;

      if (isContactBlocked) {
        console.log("Blocked contact:", contact.id);
      } else {
        console.log("Unblocked contact:", contact.id);
      }
      setIsBlocked(isContactBlocked);
    } catch (error) {
      console.log("Error blocking contact:", error);
      console.log(error.message);
    }
  };

  console.log("Is blocked:", isBlocked);
  console.log("Have contact blocked you:", haveContactBlockedYou);

  return (
    <>
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
      </View>
      <View className="w-full p-4 flex-1 justify-end items-start bg-white dark:bg-slate-700">
        {haveContactBlockedYou ? (
          <View className="w-full flex-grow max-h-[60px] flex flex-row justify-center items-center bg-red-400 p-2 rounded-xl">
            <Text className="text-xl text-slate-200 font-bold">
              This contact has blocked you!
            </Text>
          </View>
        ) : isBlocked ? (
          <View className="w-full flex-grow max-h-[60px] flex flex-row justify-center items-center bg-red-400 p-2 rounded-xl">
            <Text className="text-xl text-slate-200 font-bold">
              You have blocked this contact!
            </Text>
          </View>
        ) : (
          <Pressable
            onPress={handleChat}
            className="w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-green-400 bg-green-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-slate-200">Chat</Text>
          </Pressable>
        )}

        {isBlocked ? (
          <Pressable
            onPress={handleBlockContact}
            className="w-full flex-grow max-h-[60px] mt-2 p-2 flex justify-center items-center border-2 border-yellow-400 bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-slate-400">Unblock</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleBlockContact}
            className="w-full flex-grow max-h-[60px] mt-2 p-2 flex justify-center items-center border-2 border-red-400 bg-red-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-slate-200">Block</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

export default IndividualChatInfo;
