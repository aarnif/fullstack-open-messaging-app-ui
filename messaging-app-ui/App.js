import Main from "./src/components/Main";

import { NativeRouter } from "react-router-native";

import "./styles.css";

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </>
  );
};

export default App;
