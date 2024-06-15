import { formatDistance } from "date-fns";

const getLatestMessageTime = (latestMessageTime) =>
  latestMessageTime
    ? formatDistance(new Date(latestMessageTime), new Date()).replace(
        "about",
        ""
      ) + " ago"
    : null;

export default getLatestMessageTime;
