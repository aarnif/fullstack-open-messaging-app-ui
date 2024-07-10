import Constants from "expo-constants";

const uploadImage = async (name, file) => {
  const data = new FormData();
  data.append("image", file);
  data.append("name", name);

  return await fetch(
    `https://api.imgbb.com/1/upload?key=${Constants.expoConfig.extra.imgbbApikey}`,
    {
      method: "POST",
      body: data,
      headers: {
        "content-type": "application/json",
      },
    }
  ).then((res) => res.json());
};

export default {
  uploadImage,
};
