import React, { useState } from 'react';
import ChatSection from '../components/ChatSection';

const initialChatData = [
  { 
    id: 1, 
    sender: "Larissa", 
    text: "Hello everyone! How is your week going?", 
    type: "received" 
  },
  { 
    id: 2, 
    sender: "You", 
    text: "Hi Larissa! It's going well, just finished a great workout session. Check out this shot from my training! How about you?", 
    type: "sent",
    img: "/img/personal training.jpg",
    alt: "A photo from personal training session"
  },
  { 
    id: 3, 
    sender: "Rain", 
    text: "Hi everyone! I just started a new workout routine and it's going really well so far.", 
    type: "received" 
  }
];

export default function CommunityPage() {
  const [messages, setMessages] = useState(initialChatData);
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