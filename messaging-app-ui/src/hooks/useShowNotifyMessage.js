import { useState } from "react";

const useShowNotifyMessage = () => {
  const [message, setMessage] = useState(null);

  const show = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return { message, show };
};

export default useShowNotifyMessage;
