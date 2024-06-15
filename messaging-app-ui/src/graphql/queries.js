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
      image
      participants {
        id
        username
      }
      messages {
        id
        sender {
          id
          username
          name
        }
        content
        createdAt
      }
      latestMessage {
        sender {
          id
          username
          name
        }
        content
        createdAt
      }
    }
  }
`;
