import {
  CHAT_DELETED,
  NEW_CHAT_ADDED,
  NEW_MESSAGE_ADDED,
  MESSAGES_IN_CHAT_READ,
  PARTICIPANTS_ADDED_TO_GROUP_CHAT,
  PARTICIPANTS_REMOVED_FROM_GROUP_CHAT,
  LEFT_GROUP_CHAT,
  CONTACTS_ADDED,
  CONTACT_BLOCKED,
  CONTACT_REMOVED,
  CHAT_EDITED,
} from "../graphql/subscriptions";

import {
  GET_CHATS_BY_USER,
  GET_CONTACTS_BY_USER,
  GET_CURRENT_USER,
} from "../graphql/queries";

import { useApolloClient, useSubscription } from "@apollo/client";
import { EDIT_CHAT } from "../graphql/mutations";

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

  useSubscription(CHAT_EDITED, {
    onData: ({ data }) => {
      console.log("Use CHAT_EDITED-subscription:");
      const updatedChat = data.data.groupChatUpdated;
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

  useSubscription(MESSAGES_IN_CHAT_READ, {
    onData: ({ data }) => {
      console.log("Use MESSAGES_IN_CHAT_READ-subscription:");
      const updatedChat = data.data.messagesInChatRead;
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

  useSubscription(PARTICIPANTS_ADDED_TO_GROUP_CHAT, {
    onData: ({ data }) => {
      console.log("Use PARTICIPANTS_ADDED_TO_GROUP_CHAT-subscription:");
      const chatWithAddedParticipants = data.data.participantsAddedToGroupChat;
      client.cache.updateQuery(
        {
          query: GET_CHATS_BY_USER,
          variables: { userId: user.id, searchByTitle: "" },
        },
        ({ allChatsByUser }) => {
          const checkIfChatAlreadyExists = allChatsByUser.find(
            (chat) => chat.id === chatWithAddedParticipants.id
          );

          if (checkIfChatAlreadyExists) {
            return {
              allChatsByUser: allChatsByUser
                .map((chat) => {
                  return chat.id === chatWithAddedParticipants.id
                    ? { ...chatWithAddedParticipants }
                    : chat;
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

          return {
            allChatsByUser: allChatsByUser
              .concat(chatWithAddedParticipants)
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

  // When using this hook for the first time Apollo-client throws a console warning: "JSON Parse error: Unterminated string",
  // unable to find the cause of this warning right now.
  useSubscription(PARTICIPANTS_REMOVED_FROM_GROUP_CHAT, {
    onData: ({ data }) => {
      console.log("Use PARTICIPANTS_REMOVED_FROM_GROUP_CHAT-subscription:");
      const updatedChat = data.data.participantsRemovedFromGroupChat;
      client.cache.updateQuery(
        {
          query: GET_CHATS_BY_USER,
          variables: { userId: user.id, searchByTitle: "" },
        },
        ({ allChatsByUser }) => {
          const checkIfUserIsParticipant = updatedChat.participants.find(
            (participant) => participant.id === user.id
          );

          console.log(
            "Check if user is participant:",
            checkIfUserIsParticipant
          );

          if (!checkIfUserIsParticipant) {
            return {
              allChatsByUser: allChatsByUser
                .filter((chat) => chat.id !== updatedChat.id)
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

  // When using this hook for the first time Apollo-client throws a console warning: "JSON Parse error: Unterminated string",
  // unable to find the cause of this warning right now.
  useSubscription(LEFT_GROUP_CHAT, {
    onData: ({ data }) => {
      console.log("Use LEFT_GROUP_CHAT-subscription:");
      const leftGroupChatId = data.data.leftGroupChat;
      client.cache.updateQuery(
        {
          query: GET_CHATS_BY_USER,
          variables: { userId: user.id, searchByTitle: "" },
        },
        ({ allChatsByUser }) => {
          return {
            allChatsByUser: allChatsByUser
              .filter((chat) => chat.id !== leftGroupChatId)
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

  // When using this hook Apollo-client throws a console JSON Parse erros,
  // fix this error later.
  useSubscription(CONTACTS_ADDED, {
    onData: ({ data }) => {
      console.log("Use CONTACTS_ADDED-subscription:");
      const addedContacts = data.data.contactsAdded;
      console.log("Added contacts:", addedContacts);
      client.cache.updateQuery(
        {
          query: GET_CONTACTS_BY_USER,
          variables: { searchByName: "" },
        },
        ({ allContactsByUser }) => {
          console.log("All contacts by user:", allContactsByUser);
          return {
            allContactsByUser: {
              ...allContactsByUser,
              contacts: allContactsByUser.contacts.concat(addedContacts),
            },
          };
        }
      );
    },
  });

  useSubscription(CONTACT_REMOVED, {
    onData: ({ data }) => {
      console.log("Use CONTACT_REMOVED-subscription:");
      const removedContact = data.data.contactRemoved;
      console.log("Removed contact:", removedContact);
      client.cache.updateQuery(
        {
          query: GET_CONTACTS_BY_USER,
          variables: { searchByName: "" },
        },
        ({ allContactsByUser }) => {
          console.log("All contacts by user:", allContactsByUser);
          return {
            allContactsByUser: {
              ...allContactsByUser,
              contacts: allContactsByUser.contacts.filter(
                (contact) => contact.id !== removedContact
              ),
            },
          };
        }
      );
    },
  });

  useSubscription(CONTACT_BLOCKED, {
    onData: ({ data }) => {
      console.log("Use CONTACT_BLOCKED-subscription:");
      const blockedContact = data.data.contactBlocked;
      console.log("Blocked contact:", blockedContact);
      client.cache.updateQuery(
        {
          query: GET_CURRENT_USER,
          variables: { searchByName: "" },
        },
        ({ me }) => {
          console.log("Current user:", me);
          return {
            me: {
              ...me,
              blockedContacts: me.blockedContacts.includes(blockedContact)
                ? me.blockedContacts.filter(
                    (contact) => contact.id === blockedContact
                  )
                : me.blockedContacts.concat(blockedContact),
            },
          };
        }
      );
    },
  });
};

export default useSubscriptions;
