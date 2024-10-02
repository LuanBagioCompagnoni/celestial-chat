import { useEffect, useState } from 'react';
import MessageInput from '../basics/messageInput';
import Messages from './messages';
import { useSocket } from '@/services/socket.js';
import {useAuth} from '@/context/AuthContext.js';

export default function Chat({ selectedContact, messagesToChat }) {
  const { user } = useAuth();
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState(messagesToChat);
  const [inputMessage, setInputMessage] = useState('');
  console.log('messagesToChat', messagesToChat);

  useEffect(() => {
    if(socket){
      socket.on('receiveMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!selectedContact) {
      alert('Selecione um contato antes de enviar uma mensagem');
      return;
    }

    let newMessage = {
      originUserId: user._id,
      destinationUserId: selectedContact._id,
      type: 'text',
      content: inputMessage,
      date: new Date()
    };

    if(inputMessage){
      socket.emit('sendMessage', newMessage);
      socket.emit('typing', false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  const handleInputChange = (event) => {
    socket.emit('typing', true);
    setInputMessage(event.target.value);
  };

  return (
    <div className="bg-[#464b5b] w-[50vw] border-r border-[#0b111f] relative h-screen">
      <div className='absolute grid grid-col-1 w-full h-[93%] bottom-gradient-scrollbar'>
        <Messages content={messages} />
      </div>
      <div className="absolute inset-x-0 bottom-0 my-2 p-2 h-[7%]">
        <MessageInput
          onSubmit={sendMessage}
          value={inputMessage}
          onChange={handleInputChange}
          className='absolute inset-x-0'
          style={{ height: '100%', overflowY: 'auto', resize: 'none' }}
        />
      </div>
    </div>
  );
}
