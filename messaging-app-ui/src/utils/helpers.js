import { format, isToday, isThisWeek } from "date-fns";

const getLatestMessageTime = (latestMessageTime) => {
  if (!latestMessageTime) {
    return null;
  } else if (isToday(new Date(latestMessageTime))) {
    return format(new Date(latestMessageTime), "hh:mm");
  } else if (isThisWeek(new Date(latestMessageTime))) {
    return format(new Date(latestMessageTime), "EEEE");
  } else {
    return format(new Date(latestMessageTime), "MM.dd.yyyy");
  }
};

const sliceLatestMessage = (latestMessage) =>
  latestMessage.length > 30
    ? latestMessage.slice(0, 30) + "..."
    : latestMessage;

export default { getLatestMessageTime, sliceLatestMessage };
