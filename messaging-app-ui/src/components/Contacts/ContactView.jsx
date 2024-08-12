import {
  CREATE_CHAT,
  BLOCK_OR_UNBLOCK_CONTACT,
  REMOVE_CONTACT,
} from "../../graphql/mutations";
import {
  GET_USER_BY_ID,
  GET_CHAT_BY_PARTICIPANTS,
} from "../../graphql/queries";
import useSubscriptions from "../../hooks/useSubscriptions";
import useNotifyMessage from "../../hooks/useNotifyMessage";
import ImageViewModal from "../Modals/ImageViewModal";
import confirmAlert from "../confirmAlert";

import { useMatch } from "react-router-native";
import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Pressable, Image } from "react-native";

import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ContactView = ({ user }) => {
  const notifyMessage = useNotifyMessage();
  const [contact, setContact] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showImageViewModal, setShowImageViewModal] = useState(false);

  useSubscriptions(user);

  const match = useMatch("/contacts/:id").params;
  const navigate = useNavigate();

  const getUserById = useQuery(GET_USER_BY_ID, {
    variables: {
      id: match.id,
    },
  });

  useEffect(() => {
    if (getUserById.data) {
      setContact(getUserById.data.findUserById);
      setIsBlocked(
        user.blockedContacts.includes(getUserById.data.findUserById.id)
      );
    }
  }, [getUserById.data]);

  console.log("Contact:", contact);

  const chatByParticipants = useQuery(GET_CHAT_BY_PARTICIPANTS, {
    variables: {
      participants: [user.id, contact?.id],
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

  const [removeContact] = useMutation(REMOVE_CONTACT, {
    onError: (error) => {
      console.log("Error removing contact mutation:");
      console.log(error.graphQLErrors[0].message);
    },
  });

  const haveContactBlockedYou = contact?.blockedContacts.includes(user.id);

  const goBack = () => {
    console.log("Go back to contacts page!");
    navigate(`/contacts`);
  };

  const handleChat = async () => {
    console.log("Press chat button!");

    // Check if user already has a chat with this contact and navigate to it
    if (chatByParticipants.data?.findChatByParticipants) {
      console.log(
        "Chat exists:",
        chatByParticipants.data.findChatByParticipants
      );
      navigate(`/chats/${chatByParticipants.data.findChatByParticipants.id}`);
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
        notifyMessage.show({
          content: "Contact blocked!",
          isError: true,
        });
      } else {
        console.log("Unblocked contact:", contact.id);
        notifyMessage.show({
          content: "Contact unblocked!",
          isError: false,
        });
      }
      setIsBlocked(isContactBlocked);
    } catch (error) {
      console.log("Error blocking contact:", error);
      console.log(error.message);
    }
  };

  const handleRemoveContact = () => {
    console.log("Press remove contact button!");

    try {
      const { data, error } = removeContact({
        variables: {
          contactId: contact.id,
        },
      });
      navigate(`/contacts`);
      notifyMessage.show({
        content: "Contact removed!",
        isError: false,
      });
    } catch (error) {
      console.log("Error removing contact:", error);
      console.log(error.message);
    }
  };

  console.log("Is blocked:", isBlocked);
  console.log("Have contact blocked you:", haveContactBlockedYou);

  if (!contact) {
    return null;
  }

  return (
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
              <Text className="text-xl text-white font-bold">Contact Info</Text>
            </View>
          </View>

          <View className="w-[50px] mr-4 flex-grow flex justify-center items-center"></View>
        </View>
      </View>
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

      <View className="w-full p-4 flex-1 justify-end items-start bg-white dark:bg-slate-700">
        <Pressable
          onPress={handleChat}
          className="mb-2 w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-slate-200 bg-slate-200 rounded-xl 
            dark:border-slate-500 dark:bg-slate-500"
        >
          <Text className="text-xl font-bold text-slate-700 dark:text-slate-200">
            Chat
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            confirmAlert(
              isBlocked ? "Unblock Contact?" : "Block Contact?",
              isBlocked
                ? "Are you sure you want to unblock this contact?"
                : "Are you sure you want to block this contact?",
              handleBlockContact
            )
          }
          className="mb-2 w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-slate-200 bg-slate-200 rounded-xl 
            dark:border-slate-500 dark:bg-slate-500"
        >
          {isBlocked ? (
            <Text className="text-xl font-bold text-slate-700 dark:text-slate-200">
              Unblock Contact
            </Text>
          ) : (
            <Text className="text-xl font-bold text-slate-700 dark:text-slate-200">
              Block Contact
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() =>
            confirmAlert(
              "Remove Contact?",
              "Are you sure you want to remove this contact?",
              handleRemoveContact
            )
          }
          className="mb-2 w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-slate-200 bg-slate-200 rounded-xl 
            dark:border-slate-500 dark:bg-slate-500"
        >
          <Text className="text-xl font-bold text-slate-700 dark:text-slate-200">
            Remove Contact
          </Text>
        </Pressable>
      </View>
      {showImageViewModal && (
        <ImageViewModal
          type={"profile"}
          data={contact}
          setShowImageViewModal={setShowImageViewModal}
        />
      )}
    </SafeAreaView>
  );
};

export default ContactView;
