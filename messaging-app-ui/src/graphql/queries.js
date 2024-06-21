import { gql } from "@apollo/client";

export const CHAT_DETAILS = gql`
  fragment ChatDetails on Chat {
    id
    title
    image
    participants {
      id
      username
      name
    }
    messages {
      id
      content
      sender {
        id
        username
        name
      }
      createdAt
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_CHATS_BY_USER = gql`
  query AllChatsByUser($userId: ID!, $searchByTitle: String) {
    allChatsByUser(userId: $userId, searchByTitle: $searchByTitle) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;

export const GET_CONTACTS_BY_USER = gql`
  query AllContactsByUser($searchByName: String) {
    allContactsByUser(searchByName: $searchByName) {
      contacts {
        id
        username
        name
        about
      }
    }
  }
`;

export const GET_CHAT_BY_ID = gql`
  query FindChatById($chatId: ID!) {
    findChatById(chatId: $chatId) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;
