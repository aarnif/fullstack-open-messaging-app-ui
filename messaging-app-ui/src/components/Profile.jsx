import baseUrl from "../../baseUrl";

import Header from "./Header";
import Menu from "./Menu";

import { View, Text, Image } from "react-native";

const Profile = ({ user, handleEditProfilePress }) => {
  return (
    <>
      <Header user={user} handlePress={handleEditProfilePress} />
      <Text className="text-2xl font-bold mt-4 mx-4 mb-2">Profile</Text>
      <View className="w-full py-4 flex justify-center items-center bg-white">
        <Image
          source={{
            uri: `${baseUrl}/images/contacts/${user.id}`,
          }}
          style={{ width: 120, height: 120, borderRadius: 9999 }}
        />
        <Text className="mt-4 text-xl text-slate-800 font-bold">
          {user.name}
        </Text>
        <Text className="text-md text-slate-500 font-bold">
          @{user.username}
        </Text>
        <Text className="mt-4 text-base text-slate-700">{user.about}</Text>
      </View>

      {user && <Menu />}
    </>
  );
};

export default Profile;
