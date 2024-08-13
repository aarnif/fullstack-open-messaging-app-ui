import { BLOCK_OR_UNBLOCK_CONTACT, REMOVE_CONTACT } from "../graphql/mutations";
import useNotifyMessage from "../hooks/useNotifyMessage";
import confirmAlert from "./confirmAlert";

import { View, Text, Pressable } from "react-native";

import { useMutation } from "@apollo/client";

const IndividualContactOptions = ({
  contact,
  isBlocked,
  setIsBlocked,
  handleChat,
  handleRemoveContact,
}) => {
  const notifyMessage = useNotifyMessage();
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

  return (
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
  );
};

export default IndividualContactOptions;
