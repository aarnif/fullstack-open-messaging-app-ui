import "dotenv/config";

export default {
  name: "messaging-app-ui",
  slug: "messaging-app-ui",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    uri: process.env.APOLLO_URI,
  },
};
