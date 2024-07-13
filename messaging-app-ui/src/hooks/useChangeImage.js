import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-camera";

const useChangeImage = (currentImage, onChange) => {
  const [image, setImage] = useState(currentImage);
  const [base64Image, setBase64Image] = useState(null); // Base64 image required in uploading image to server

  const [permission, requestPermission] = useCameraPermissions();
  const chooseImageFromCamera = async () => {
    if (!permission.granted) {
      console.log("Request camera permission");
      const { granted } = await requestPermission();
      if (!granted) {
        console.log("Permission not granted");
        return;
      }
    }

    console.log("Permission granted");

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64);
      onChange();
    }
  };

  const chooseImageFromFiles = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64);
      onChange();
    }
  };

  const reset = () => {
    setImage(null);
    setBase64Image(null);
  };

  return {
    image,
    base64Image,
    reset,
    chooseImageFromCamera,
    chooseImageFromFiles,
  };
};

export default useChangeImage;
