import Svg, { Path } from "react-native-svg";

const MessageBubbleEdge = ({ color }) => (
  <Svg
    fill={color}
    width="20px"
    height="15px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path d="M21,21H3L12,3Z" />
  </Svg>
);
export default MessageBubbleEdge;
