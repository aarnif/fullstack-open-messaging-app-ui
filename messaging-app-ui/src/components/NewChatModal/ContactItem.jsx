import { Pressable, View, Text, Image } from "react-native";
import baseUrl from "../../../baseUrl";

import { CREATE_CHAT } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

const ContactItem = ({ user, item, setShowNewChatModal }) => {
  const [mutate] = useMutation(CREATE_CHAT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const navigate = useNavigate();

  const handlePress = async () => {
    console.log(`Contact item ${item.id} pressed!`);

    try {
      const { data, error } = await mutate({
        variables: {
          title: item.name,
          participants: [user.id, item.id],
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
      console.log(error);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="flex flex-row items-center my-2 mx-4">
        <View className="mr-4">
          <Image
            source={{
              uri: `${baseUrl}/images/contacts/${item.id}`,
            }}
            style={{ width: 48, height: 48, borderRadius: 9999 }}
          />
        </View>
        <View className="flex-1">
          <View className="flex flex-row">
            <Text className="text-md text-slate-700 font-bold">
              {item.name}
            </Text>
            <Text className="ml-1 text-md text-slate-500 font-bold">
              @{item.username}
            </Text>
          </View>
          <Text className="text-sm text-slate-700">{item.about}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactItem;
