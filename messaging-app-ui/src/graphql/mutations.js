import { gql } from "@apollo/client";
import { USER_DETAILS, CHAT_DETAILS } from "./queries";

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
  mutation AddMessageToChat(
    $chatId: ID!
    $type: String
    $content: String!
    $input: ImageInput
  ) {
    addMessageToChat(
      chatId: $chatId
      type: $type
      content: $content
      input: $input
    ) {
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

export const REMOVE_CHAT_MEMBERS = gql`
  mutation RemoveParticipantsFromGroupChat(
    $chatId: ID!
    $participants: [ID!]!
  ) {
    removeParticipantsFromGroupChat(
      chatId: $chatId
      participants: $participants
    ) {
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

export const ADD_CONTACTS = gql`
  mutation AddContacts($contacts: [ID!]!) {
    addContacts(contacts: $contacts) {
      id
      username
      name
      contacts {
        ...UserDetails
      }
    }
  }

  ${USER_DETAILS}
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile($name: String, $about: String, $input: ImageInput) {
    editProfile(name: $name, about: $about, input: $input) {
      ...UserDetails
    }
  }

  ${USER_DETAILS}
`;

export const EDIT_CHAT = gql`
  mutation UpdateGroupChat(
    $chatId: ID!
    $title: String
    $description: String
    $input: ImageInput
  ) {
    updateGroupChat(
      chatId: $chatId
      title: $title
      description: $description
      input: $input
    ) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;

export const BLOCK_OR_UNBLOCK_CONTACT = gql`
  mutation BlockOrUnBlockContact($contactId: ID!) {
    blockOrUnBlockContact(contactId: $contactId)
  }
`;
