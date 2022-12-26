import ChatBotComponent from '../../components/ChatBot/ChatBot';

const ChatBotPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginTop: '100px',
      }}
    >
      <ChatBotComponent />
    </div>
  );
};

export default ChatBotPage;
