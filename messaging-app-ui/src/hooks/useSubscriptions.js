import {
  CHAT_DELETED,
  NEW_CHAT_ADDED,
  NEW_MESSAGE_ADDED,
} from "../graphql/subscriptions";

import { GET_CHATS_BY_USER } from "../graphql/queries";

import { useApolloClient, useSubscription } from "@apollo/client";

const useSubscriptions = (user) => {
  const client = useApolloClient();

  // When using this hook for the first time Apollo-client throws a console warning: "JSON Parse error: Unterminated string",
  // unable to find the cause of this warning right now.
  useSubscription(CHAT_DELETED, {
    onData: ({ data }) => {
      console.log("Use CHAT_DELETED-subscription:");
      const deletedChatId = data.data.chatDeleted;
      client.cache.updateQuery(
        {
          query: GET_CHATS_BY_USER,
          variables: { userId: user.id, searchByTitle: "" },
        },
        ({ allChatsByUser }) => {
          return {
            allChatsByUser: allChatsByUser
              .filter((chat) => chat.id !== deletedChatId)
              .sort((a, b) => {
                if (!a.messages.length) return 1;

                if (!b.messages.length) return -1;

                return (
                  new Date(b.messages[0].createdAt) -
                  new Date(a.messages[0].createdAt)
                );
              }),
          };
        }
      );
    },
  });

  useSubscription(NEW_MESSAGE_ADDED, {
    onData: ({ data }) => {
      console.log("Use NEW_MESSAGE_ADDED-subscription:");
      const updatedChat = data.data.messageToChatAdded;
      client.cache.updateQuery(
        {
          query: GET_CHATS_BY_USER,
          variables: { userId: user.id, searchByTitle: "" },
        },
        ({ allChatsByUser }) => {
          return {
            allChatsByUser: allChatsByUser
              .map((chat) => {
                return chat.id === updatedChat.id ? { ...updatedChat } : chat;
              })
              .sort((a, b) => {
                if (!a.messages.length) return 1;

                if (!b.messages.length) return -1;

                return (
                  new Date(b.messages[0].createdAt) -
                  new Date(a.messages[0].createdAt)
                );
              }),
          };
        }
      );
    },
  });

  useSubscription(NEW_CHAT_ADDED, {
    onData: ({ data }) => {
      console.log("Use NEW_CHAT_ADDED-subscription:");
      const newChat = data.data.chatAdded;
      client.cache.updateQuery(
        {
          query: GET_CHATS_BY_USER,
          variables: { userId: user.id, searchByTitle: "" },
        },
        ({ allChatsByUser }) => {
          return {
            allChatsByUser: allChatsByUser.concat(newChat).sort((a, b) => {
              if (!a.messages.length) return 1;

              if (!b.messages.length) return -1;

              return (
                new Date(b.messages[0].createdAt) -
                new Date(a.messages[0].createdAt)
              );
            }),
          };
        }
      );
    },
  });
};

export default useSubscriptions;
