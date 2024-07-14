import { useState } from "react";

import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const useDownloadImage = (image) => {
  const [loading, setLoading] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const saveFile = async () => {
    console.log("Permission status:", permissionResponse.status);
    if (permissionResponse.status !== "granted") {
      console.log("Requesting permission...");
      const { granted } = await requestPermission();
      console.log("granted", granted);
      if (!granted) {
        console.log("Permission not granted");
        return;
      }
    }
    console.log("Permission granted");

    try {
      setLoading(true);
      console.log("Downloading file...");
      const imageName = image.split("/").pop();
      const albumName = "Downloads";
      const fileUri = FileSystem.documentDirectory + imageName;

      const res = await FileSystem.downloadAsync(image, fileUri);
      //   console.log("Downloaded file: ", res.uri);
      const asset = await MediaLibrary.createAssetAsync(res.uri);
      const album = await MediaLibrary.getAlbumAsync(albumName);
      //   console.log("Album: ", album);
      //   console.log("Asset: ", asset);
      if (album == null) {
        console.log("Creating album and adding image...");
        await MediaLibrary.createAlbumAsync(albumName, asset, false);
      } else {
        console.log("Adding image to existing album...");
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      console.log(`Image ${image} saved successfully to ${albumName}`);
    } catch (err) {
      console.log("FS Err: ", err);
    }
    setLoading(false);
  };

  return { saveFile, loading };
};

export default useDownloadImage;
