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
  mutation CreateChat(
    $title: String
    $description: String
    $participants: [ID!]!
  ) {
    createChat(
      title: $title
      description: $description
      participants: $participants
    ) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;

export const ADD_MESSAGE_TO_CHAT = gql`
  mutation AddMessageToChat($chatId: ID!, $type: String, $content: String!) {
    addMessageToChat(chatId: $chatId, type: $type, content: $content) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;

export const DELETE_CHAT = gql`
  mutation DeleteChat($chatId: ID!) {
    deleteChat(chatId: $chatId)
  }
`;

export const MARK_MESSAGES_IN_CHAT_READ = gql`
  mutation MarkAllMessagesInChatRead($chatId: ID!) {
    markAllMessagesInChatRead(chatId: $chatId) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;

export const ADD_NEW_CHAT_MEMBERS = gql`
  mutation AddParticipantsToGroupChat($chatId: ID!, $participants: [ID!]!) {
    addParticipantsToGroupChat(chatId: $chatId, participants: $participants) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;

export const LEAVE_GROUP_CHAT = gql`
  mutation LeaveGroupChat($chatId: ID!) {
    leaveGroupChat(chatId: $chatId)
  }
`;
