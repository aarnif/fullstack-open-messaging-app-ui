import { gql } from "@apollo/client";

export const CHAT_DETAILS = gql`
  fragment ChatDetails on Chat {
    id
    title
    image
    description
    isGroupChat
    admin {
      id
      username
      name
      about
    }
    participants {
      id
      username
      name
      about
    }
    messages {
      id
      type
      content
      sender {
        id
        username
        name
      }
      isReadBy {
        member {
          id
          username
        }
        isRead
      }
      createdAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query AllUsers($searchByName: String) {
    allUsers(searchByName: $searchByName) {
      id
      username
      name
      about
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      id
      username
      name
      about
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

export const GET_ALL_CONTACTS_EXCEPT_BY_USER = gql`
  query AllContactsExceptByUser($searchByName: String) {
    allContactsExceptByUser(searchByName: $searchByName) {
      id
      username
      name
      about
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

export const GET_CHAT_BY_PARTICIPANTS = gql`
  query FindChatByParticipants($participants: [ID!]!) {
    findChatByParticipants(participants: $participants) {
      ...ChatDetails
    }
  }

  ${CHAT_DETAILS}
`;
