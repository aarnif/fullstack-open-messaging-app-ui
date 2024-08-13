import { REMOVE_CONTACT } from "../../../graphql/mutations";
import useNotifyMessage from "../../../hooks/useNotifyMessage";
import IndividualContactCard from "../../IndividualContactCard";
import IndividualContactOptions from "../../IndividualContactOptions";

import NotifyMessage from "../../NotifyMessage";

import { useState } from "react";

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

  const notifyMessage = useNotifyMessage();
  const [contact, setContact] = useState(getAnotherParticipant);
  const [isBlocked, setIsBlocked] = useState(
    user.blockedContacts.includes(getAnotherParticipant.id)
  );

  const [removeContact] = useMutation(REMOVE_CONTACT, {
    onError: (error) => {
      console.log("Error removing contact mutation:");
      console.log(error.graphQLErrors[0].message);
    },
  });

  const haveContactBlockedYou = contact?.blockedContacts.includes(user.id);

  const handleChat = async () => {
    console.log("Press chat button!");
    setShowChatInfoModal(false);
  };

  const handleRemoveContact = () => {
    console.log("Press remove contact button!");

    try {
      const { data, error } = removeContact({
        variables: {
          contactId: contact.id,
        },
      });
      setShowChatInfoModal(false);
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

  return (
    <>
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
      {/* Will not currently show notification without adding the component here also */}
      <NotifyMessage />
    </>
  );
};

export default IndividualChatInfo;
