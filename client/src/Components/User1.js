import '../App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function User1() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.on('receive message user1', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
    socket.on('user typing user2', () => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      const newMessage = { text: input, sender: 'User 1' };
      socket.emit('send message user1', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');
    }
  };

  return (
    <div className="user-container">
      <h2>User 1</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <img className="profile-pic" src={`https://i.pravatar.cc/50?u=${msg.sender}`} alt="Profile" />
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}
        {isTyping && <div className="typing-indicator">User 2 is typing...</div>}
      </div>
      <form className="form-container" onSubmit={sendMessage}>
        <input
          className="input-message"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="send-button" type="submit">Send</button>
      </form>
    </div>
  );
}

export default User1;