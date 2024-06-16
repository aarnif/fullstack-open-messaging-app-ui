import { formatDistance } from "date-fns";

const getLatestMessageTime = (latestMessageTime) =>
  latestMessageTime
    ? formatDistance(new Date(latestMessageTime), new Date()).replace(
        "about",
        ""
      ) + " ago"
    : null;

const sliceLatestMessage = (latestMessage) =>
  latestMessage.length > 30
    ? latestMessage.slice(0, 30) + "..."
    : latestMessage;

export default { getLatestMessageTime, sliceLatestMessage };
