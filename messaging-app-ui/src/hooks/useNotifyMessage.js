import { useContext } from "react";
import NotifyMessageContext from "../contexts/NotifyMessageContext";

const useNotifyMessage = () => {
  return useContext(NotifyMessageContext);
};

export default useNotifyMessage;
