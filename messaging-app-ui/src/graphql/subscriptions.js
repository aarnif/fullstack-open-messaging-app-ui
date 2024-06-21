import { CHAT_DETAILS } from "./queries";

import { gql } from "@apollo/client";

export const NEW_MESSAGE_ADDED = gql`
  subscription MessageToChatAdded {
    messageToChatAdded {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;
