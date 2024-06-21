import { gql } from "@apollo/client";
import { CHAT_DETAILS } from "./queries";

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

export const CREATE_CHAT = gql`
  mutation CreateChat($title: String, $participants: [ID!]!) {
    createChat(title: $title, participants: $participants) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;

export const ADD_MESSAGE_TO_CHAT = gql`
  mutation AddMessageToChat($chatId: ID!, $content: String!) {
    addMessageToChat(chatId: $chatId, content: $content) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;
