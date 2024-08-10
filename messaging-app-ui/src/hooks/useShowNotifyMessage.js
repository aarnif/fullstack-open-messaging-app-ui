import { useState } from "react";

const useShowNotifyMessage = () => {
  const [content, setContent] = useState(null);

  const show = (message) => {
    setContent(message);
    setTimeout(() => {
      setContent(null);
    }, 3000);
  };

  return { content, show };
};

export default useShowNotifyMessage;
