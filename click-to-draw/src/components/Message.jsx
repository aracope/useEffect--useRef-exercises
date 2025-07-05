function Message({ text }) {
  if (!text) return null;
  return <div className="message-area">{text}</div>;
}

export default Message;
