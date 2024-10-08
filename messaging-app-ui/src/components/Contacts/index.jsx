import { GET_CONTACTS_BY_USER } from "../../graphql/queries";
import useSubscriptions from "../../hooks/useSubscriptions";
import Header from "../Header";
import SearchBar from "../SearchBar";
import ContactItem from "./ContactItem";
import LoadingIcon from "../LoadingIcon";
import Menu from "../Menu";
import ContactView from "./ContactView";

import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";

const ContactsHeader = ({ searchByTitle, handleChange }) => {
  return (
    <View className="w-full bg-white dark:bg-slate-700">
      <Text className="text-2xl font-bold mt-4 mx-4 mb-2 dark:text-slate-200">
        Contacts
      </Text>
      <SearchBar
        placeholder={"Search by name..."}
        searchByTitle={searchByTitle}
        handleChange={handleChange}
      />
    </View>
  );
};

const ContactsList = ({ user, data }) => {
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
        return <ContactItem user={user} item={item} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

const Contacts = ({ user, handleNewContactPress }) => {
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
        <ContactsList user={user} data={data?.allContactsByUser.contacts} />
      )}
      {user && <Menu />}
    </>
  );
};

export default Contacts;
