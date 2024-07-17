import { CREATE_CHAT, BLOCK_OR_UNBLOCK_CONTACT } from "../../graphql/mutations";
import { GET_CHAT_BY_PARTICIPANTS } from "../../graphql/queries";
import ProfileImageViewModal from "../Profile/ProfileImageViewModal";

import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";

import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ContactInfo = ({
  user,
  contact,
  showContactInfoModal,
  setShowContactInfoModal,
}) => {
  console.log("Contact:", contact);
  const [showImageViewModal, setShowImageViewModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(
    user.blockedContacts.includes(contact.id)
  );
  const [haveContactBlockedYou, setHaveContactBlockedYou] = useState(
    contact.blockedContacts.includes(user.id)
  );

  const navigate = useNavigate();

  const result = useQuery(GET_CHAT_BY_PARTICIPANTS, {
    variables: {
      participants: [user.id, contact.id],
    },
  });

  const [createChat] = useMutation(CREATE_CHAT, {
    onError: (error) => {
      console.log("Error creating chat mutation:");
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [blockOrUnBlockContact] = useMutation(BLOCK_OR_UNBLOCK_CONTACT, {
    onError: (error) => {
      console.log("Error blocking contact mutation:");
      console.log(error.graphQLErrors[0].message);
    },
  });

  const goBack = () => {
    console.log("Go back to contacts page!");
    setShowContactInfoModal(false);
  };

  const handleChat = async () => {
    console.log("Press chat button!");

    // Check if user already has a chat with this contact and navigate to it
    if (result.data?.findChatByParticipants) {
      console.log("Chat exists:", result.data.findChatByParticipants);
      navigate(`/chats/${result.data.findChatByParticipants.id}`);
      setShowContactInfoModal(false);
      return;
    }

    try {
      const { data, error } = await createChat({
        variables: {
          participants: [user.id, contact.id],
        },
      });
      console.log("Data:", data);

      if (data) {
        console.log("Created chat:", data);
        navigate(`/chats/${data.createChat.id}`);
        setShowNewChatModal(false);
      }
    } catch (error) {
      console.log("Error creating chat:", error);
      console.log(error.message);
    }
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

  if (showImageViewModal) {
    return (
      <ProfileImageViewModal
        user={contact}
        showImageViewModal={showImageViewModal}
        setShowImageViewModal={setShowImageViewModal}
      />
    );
  }

  console.log("Is blocked:", isBlocked);
  console.log("Have contact blocked you:", haveContactBlockedYou);

  return (
    <Modal animationType="slide" visible={showContactInfoModal}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
          <View className="flex flex-row">
            <View className="w-[50px] mr-4 flex-grow flex justify-center items-center">
              <Pressable onPress={goBack}>
                <MaterialCommunityIcons
                  name={"chevron-left"}
                  size={36}
                  color={"white"}
                />
              </Pressable>
            </View>

            <View className="max-w-[250px] flex-grow flex flex-row justify-center items-center">
              <View>
                <Text className="text-xl text-white font-bold">
                  Contact Info
                </Text>
              </View>
            </View>

            <View className="w-[50px] mr-4 flex-grow flex justify-center items-center"></View>
          </View>
        </View>
        <View className="w-full py-4 flex justify-center items-center bg-white">
          <Pressable onPress={() => setShowImageViewModal(true)}>
            <Image
              source={{
                uri: contact.profilePicture.thumbnail,
              }}
              style={{ width: 120, height: 120, borderRadius: 9999 }}
            />
          </Pressable>
          <Text className="mt-4 text-xl text-slate-800 font-bold">
            {contact.name}
          </Text>
          <Text className="text-md text-slate-500 font-bold">
            @{contact.username}
          </Text>
          <Text className="mt-4 text-base text-slate-700">{contact.about}</Text>
        </View>

        <View className="w-full p-4 flex-1 justify-end items-start bg-white">
          {haveContactBlockedYou ? (
            <View className="w-full flex-grow max-h-[60px] flex flex-row justify-center items-center bg-red-400 p-2 rounded-xl">
              <Text className="text-xl text-slate-200 font-bold">
                This contact has blocked you!
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
      </SafeAreaView>
    </Modal>
  );
};

export default ContactInfo;
