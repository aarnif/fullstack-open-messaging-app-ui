import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
  }
`;

export const ADD_MESSAGE_TO_CHAT = gql`
  mutation AddMessageToChat($chatId: ID!, $content: String!) {
    addMessageToChat(chatId: $chatId, content: $content) {
      id
      title
      participants {
        id
        username
        name
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
    }
  }
`;
