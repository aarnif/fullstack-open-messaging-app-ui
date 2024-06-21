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

export const NEW_CHAT_ADDED = gql`
  subscription ChatAdded {
    chatAdded {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;

export const CHAT_DELETED = gql`
  subscription ChatDeleted {
    chatDeleted {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;
