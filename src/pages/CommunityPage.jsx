import React, { useState } from 'react';

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
    img: "./img/personal training.jpg",
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
        {/* chat section */}
        <section className="card chat-container">
          <div className="chat-header">
            <h2>Group Chat</h2>
          </div>

          <div className="chat-messages">
            {messages.map(function(msg) {
              return (
                <div key={msg.id} className={"chat-" + msg.type}>
                  <span className="sender">{msg.sender}</span>

                  {msg.img ? (
                    <img
                      src={msg.img}
                      alt={msg.alt}
                      className="chat-inline-image"
                    />
                  ) : null}
                  
                  <p>{msg.text}</p>
                </div>
              );
            })}
          </div>

          {/* buttons to share log */}
          <section className="share-controls">
            <p className="share-title">Select data to share:</p>
            <div className="share-options">
              <button 
                type="button" 
                className="mini-share-btn" 
                onClick={function() { handleShareButtonClick("Today's Nutrition"); }}
              >
                🥗 Today's Nutrition
              </button>
              <button 
                type="button" 
                className="mini-share-btn" 
                onClick={function() { handleShareButtonClick("Workout log"); }}
              >
                🏋️ Workout log
              </button>
              <button 
                type="button" 
                className="mini-share-btn" 
                onClick={function() { handleShareButtonClick("Weekly Progress"); }}
              >
                📊 Weekly Progress
              </button>
            </div>
          </section>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <label htmlFor="chat-box" className="chat-label">Message:</label>
            <input
              type="text"
              id="chat-box"
              placeholder="Write a message..."
              value={chatInput}
              onChange={function(e) { setChatInput(e.target.value); }}
            />
            <button type="submit">Send</button>
          </form>
        </section>
      </div>
    </main>
  );
}