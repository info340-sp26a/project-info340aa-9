import React, { useState } from 'react';
import ChatSection from '../components/ChatSection';

export default function CommunityPage({ messages, setMessages }) {
  const [chatInput, setChatInput] = useState("");

  function handleSendMessage(event) {
    event.preventDefault();
    
    if (chatInput !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        text: chatInput,
        type: "sent"
      };

      setMessages([...messages, newMsg]);
      setChatInput(""); 
    }
  }
  
function handleShareButtonClick(logName) {
    const sharedMsg = {
      id: messages.length + 1,
      sender: "You",
      text: "[Shared] " + logName + " data has been sent to this chat.",
      type: "sent"
    };
    setMessages([...messages, sharedMsg]);
  }

  return (
    <main>
      <section className="page-intro">
        <h1>Muscle Gain Squad</h1>
        <p>
          Connect with others and share your progress, tips and motivation to
          stay on track with your fitness goals.
        </p>
      </section>

      <div className="community-grid-layout">
        <ChatSection
          messages={messages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
          handleShareButtonClick={handleShareButtonClick}
        />
      </div>
    </main>
  );
}