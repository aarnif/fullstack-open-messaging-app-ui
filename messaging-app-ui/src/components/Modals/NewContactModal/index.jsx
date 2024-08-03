import { GET_ALL_CONTACTS_EXCEPT_BY_USER } from "../../../graphql/queries";
import { ADD_CONTACTS } from "../../../graphql/mutations";
import LoadingIcon from "../../LoadingIcon";
import SearchBar from "../../SearchBar";
import ContactsList from "../../ContactsList";

import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";

const SearchBarContainer = ({ searchByTitle, handleChange }) => {
  return (
    <View className="py-2 w-full bg-white dark:bg-slate-700">
      <SearchBar
        placeholder={"Search by name..."}
        searchByTitle={searchByTitle}
        handleChange={handleChange}
      />
    </View>
  );
};

const NewContactModal = ({
  user,
  showNewContactModal,
  setShowNewContactModal,
}) => {
  const [chosenUsersIds, setChosenUsersIds] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [debouncedSearchByName] = useDebounce(searchByName, 500);

  console.log("Chosen users:", chosenUsersIds);
  console.log();

  const { data, loading } = useQuery(GET_ALL_CONTACTS_EXCEPT_BY_USER, {
    variables: {
      searchByName: debouncedSearchByName,
    },
  });

  const [mutate] = useMutation(ADD_CONTACTS, {
    onError: (error) => {
      console.log("Error adding contact mutation:");
      console.log(error.graphQLErrors[0].message);
    },
  });

  const navigate = useNavigate();

  const goBack = () => {
    console.log("Go back to contacts page!");
    setShowNewContactModal(false);
  };

  const handlePress = async () => {
    console.log("Press add new contacts!");
    console.log("Chosen users:", chosenUsersIds);

    try {
      const { data } = await mutate({
        variables: {
          contacts: chosenUsersIds,
        },
      });

      console.log("New contacts added:", data.addContacts);

      setShowNewContactModal(false);
      navigate("/contacts");
    } catch (error) {
      console.log("Error adding new contacts:", error);
    }
  };

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByName(text);
  };

  return (
    <Modal animationType="slide" visible={showNewContactModal}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
          <View className="w-[70px] flex justify-center items-center">
            <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
              <Pressable onPress={goBack}>
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </Pressable>
            </View>
          </View>
          <View className="flex-grow flex justify-center items-center">
            <Text className="text-xl text-white font-bold">
              Add New Contacts
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
        </View>
        <SearchBarContainer
          searchByTitle={searchByName}
          handleChange={handleChange}
        />
        {loading ? (
          <View className="flex-grow flex justify-start items-center bg-white dark:bg-slate-700">
            <LoadingIcon />
          </View>
        ) : (
          <ContactsList
            user={user}
            data={data?.allContactsExceptByUser}
            chosenUsersIds={chosenUsersIds}
            setChosenUsersIds={setChosenUsersIds}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default NewContactModal;
