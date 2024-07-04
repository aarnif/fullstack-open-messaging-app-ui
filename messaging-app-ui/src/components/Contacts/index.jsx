import { GET_CONTACTS_BY_USER } from "../../graphql/queries";
import useSubscriptions from "../../hooks/useSubscriptions";
import Header from "../Header";
import SearchBar from "../SearchBar";
import ContactItem from "./ContactItem";
import LoadingIcon from "../LoadingIcon";
import Menu from "../Menu";
import ContactInfo from "./ContactInfo";

import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";

const ContactsHeader = ({ searchByTitle, handleChange }) => {
  return (
    <View className="w-full bg-white">
      <Text className="text-2xl font-bold mt-4 mx-4 mb-2">Contacts</Text>
      <SearchBar
        placeholder={"Search by name..."}
        searchByTitle={searchByTitle}
        handleChange={handleChange}
      />
    </View>
  );
};

const ContactsList = ({ data, handleShowContactInfoModal }) => {
  if (!data.length) {
    return (
      <View className="flex justify-start items-center">
        <Text className="mt-8 text-2xl font-bold text-slate-200">
          No contacts found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      className="w-full"
      data={data}
      renderItem={({ item }) => {
        return (
          <ContactItem
            item={item}
            handleShowContactInfoModal={handleShowContactInfoModal}
          />
        );
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

const Contacts = ({ user, handleNewContactPress }) => {
  const [showContactInfoModal, setShowContactInfoModal] = useState(false);
  const [chosenContact, setChosenContact] = useState(null);
  const [searchByName, setSearchByName] = useState("");
  const [debouncedSearchByName, setDebouncedSearchByName] = useDebounce(
    searchByName,
    500
  );
  const { data, loading } = useQuery(GET_CONTACTS_BY_USER, {
    variables: {
      searchByName: debouncedSearchByName,
    },
  });

  useSubscriptions(user);

  const handleShowContactInfoModal = (id) => {
    console.log("Show contact info modal!");
    setShowContactInfoModal(true);
    const contact = data?.allContactsByUser.contacts.find(
      (contact) => contact.id === id
    );
    setChosenContact(contact);
  };

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByName(text);
  };

  return (
    <>
      <Header user={user} handlePress={handleNewContactPress} />
      <ContactsHeader
        searchByTitle={searchByName}
        handleChange={handleChange}
      />
      {loading ? (
        <View className="flex justify-end items-center">
          <LoadingIcon />
        </View>
      ) : (
        <ContactsList
          data={data?.allContactsByUser.contacts}
          handleShowContactInfoModal={handleShowContactInfoModal}
        />
      )}
      {user && <Menu />}
      {showContactInfoModal && (
        <ContactInfo
          user={user}
          contact={chosenContact}
          showContactInfoModal={showContactInfoModal}
          setShowContactInfoModal={setShowContactInfoModal}
        />
      )}
    </>
  );
};

export default Contacts;
