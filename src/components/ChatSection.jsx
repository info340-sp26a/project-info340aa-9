import React from 'react';

export default function ChatSection({ messages, chatInput, setChatInput, handleSendMessage, handleShareButtonClick }) {

  const messageList = messages.map(function(msg) {
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
  });

  return (
    <section className="card chat-container">
      <div className="chat-header">
        <h2>Group Chat</h2>
      </div>

      <div className="chat-messages">
        {messageList}
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
  );
}