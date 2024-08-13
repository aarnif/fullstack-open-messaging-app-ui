import { CREATE_CHAT, REMOVE_CONTACT } from "../../graphql/mutations";
import {
  GET_USER_BY_ID,
  GET_CHAT_BY_PARTICIPANTS,
} from "../../graphql/queries";
import useSubscriptions from "../../hooks/useSubscriptions";
import useNotifyMessage from "../../hooks/useNotifyMessage";
import ImageViewModal from "../Modals/ImageViewModal";
import IndividualContactCard from "../IndividualContactCard";
import IndividualContactOptions from "../IndividualContactOptions";

import { useMatch } from "react-router-native";
import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Pressable } from "react-native";

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

      <IndividualContactCard
        contact={contact}
        isBlocked={isBlocked}
        haveContactBlockedYou={haveContactBlockedYou}
        setShowImageViewModal={setShowImageViewModal}
      />

      <IndividualContactOptions
        contact={contact}
        isBlocked={isBlocked}
        setIsBlocked={setIsBlocked}
        handleChat={handleChat}
        handleRemoveContact={handleRemoveContact}
      />

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
