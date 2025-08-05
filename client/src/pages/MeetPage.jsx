// import '../VideoChatPage.css';




// import React, { useEffect } from 'react';

// import React, { useEffect, useRef } from 'react';
// import '../VideoChatPage.css';



import React, { useState } from 'react';
import './MeetPage.css';

const MeetPage = () => {
  
  const [isMicrophoneOn, setMicrophoneOn] = useState(true);
  const toggleMicrophone = () => {
    setMicrophoneOn((prevMicrophoneState) => !prevMicrophoneState);  
  };



  const [isVideoOn, setVideoOn] = useState(true);
  const toggleVideo = () => {
    setVideoOn((prevVideoState) => !prevVideoState);
   
  };

    
  
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const messageInput = document.getElementById('chat_message');
    const message = messageInput.value;
    if (message.trim() !== '') {
      const currentUser = 'Me';
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: currentUser, text: message.trim() },
      ]);
      messageInput.value = '';
    }
  };

  const handleKeyDown = (event) => {  
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  
  return (
    <body>
      <div className="header">
        <div className="logo">
          <h3>Meet</h3>
        </div>
      </div>
      <div className="main">
        <div className="main__left">
          <div className="videos__group">
            <div id="video-grid"></div>
          </div>
          <div className="options">
            <div className="options__left">

            <div
                className={`options__button ${isVideoOn ? '' : 'background__red'}`}
                onClick={toggleVideo}
              >
                <i className={`fa ${isVideoOn ? 'fa-video-camera' : 'fa-video-slash'}`} aria-hidden="true"></i>
              </div>

              
              <div
                className={`options__button ${isMicrophoneOn ? '' : 'background__red'}`}
                onClick={toggleMicrophone}
              >
                <i className={`fa ${isMicrophoneOn ? 'fa-microphone' : 'fa-microphone-slash'}`} aria-hidden="true"></i>
              </div>
            </div>
           
            <div className="options__right">
                <div id="inviteButton" className="options__button">
                  <i className="fas fa-user-plus"></i>
                </div>
              </div>
          </div>
        </div>
         {/* <div className="main__right">
          <div className="main__chat_window">
            <ul className="messages"></ul>
          </div>
          <div className="main__message_container">
            <input 
             id="chat_message" 
             type="text" 
             placeholder="Type message here..." 
             
           
             />

            <div className="options__button" >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </div>  */}
              <div className="main__right">
        <div className="main__chat_window">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <b>{message.user}:</b> <span >{message.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="main__message_container">
          <input
            id="chat_message"
            type="text"
            autoComplete="off"
            placeholder="Type message here..."
            onKeyDown={handleKeyDown}
          />
          <div className="options__button" onClick={sendMessage}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default MeetPage;


