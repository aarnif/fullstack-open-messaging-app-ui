import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_CHATS_BY_USER = gql`
  query AllChatsByUser($userId: ID!) {
    allChatsByUser(userId: $userId) {
      id
      title
    }
  }
`;
