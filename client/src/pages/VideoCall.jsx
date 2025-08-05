import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;  

const StyledVideo = styled.video`
  height: 40%;
  width: 30%;
  border: 1px solid #2222ff;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: 200,
  width: 300,
};

const VideoCall = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peersRef = useRef([]);
  const roomID = localStorage['call_id'];
  const [isDesktop, setIsDesktop] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState("");
  const [isMicrophoneOn, setMicrophoneOn] = useState(true);
  const [isVideoOn, setVideoOn] = useState(true);

  const toggleMicrophone = () => {
    setMicrophoneOn((prevMicrophoneState) => {
      const newMicrophoneState = !prevMicrophoneState;
      socketRef.current.emit("toggle microphone", newMicrophoneState);
      return newMicrophoneState;
    });
  };

  const toggleVideo = () => {
    setVideoOn((prevVideoState) => {
      const newVideoState = !prevVideoState;
      socketRef.current.emit("toggle video", newVideoState);
      return newVideoState;
    });
  };

  const showDesktop = () => {
    setIsDesktop(!isDesktop);
  };

  const leaveVideoMeeting = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    socketRef.current = io.connect(`${process.env.REACT_APP_SOCKET_SERVER}`);
	

    if (!isDesktop) {
      navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);

        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("call", (incoming) => {
          setCaller(incoming.from);
          setCallerSignal(incoming.signal);
        });
      });
    } else {
      navigator.mediaDevices.getDisplayMedia({ video: videoConstraints, audio: true }).then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);

        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("call", (incoming) => {
          setCaller(incoming.from);
          setCallerSignal(incoming.signal);
        });
      });
    }
  }, [isDesktop, roomID]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const answerCall = () => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: userVideo.current.srcObject,
    });

    peer.on("signal", (data) => {
      socketRef.current.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);

    setCallAccepted(true);
  };

  const declineCall = () => {
    setCaller("");
    setCallerSignal("");
  };

  const simulateIncomingCall = () => {
    const incomingCallPayload = {
      from: "JohnDoe", // Replace with the desired caller name
      signal: "simulatedSignal", // Replace with a simulated signal
    };

    // Trigger the same logic as if you received a call
    setCaller(incomingCallPayload.from);
    setCallerSignal(incomingCallPayload.signal);
  };

  return (
    <main>
      <Container>
            <StyledVideo className="user-video bg-white-600" muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => (
                <Video className="peer-video" key={index} peer={peer} />
            ))}
            {callAccepted && (
                <StyledVideo className="caller-screen" ref={partnerVideo} autoPlay playsInline />
            )}
     <div className="options-container">
      <div
        className={`options__button ${isVideoOn ? "" : "background__red"}`}
        onClick={toggleVideo}
      >
        <i className={`fa ${isVideoOn ? "fa-video-camera" : "fa-video-slash"}`} aria-hidden="true"></i>
      </div>

      <div
        className={`options__button ${isMicrophoneOn ? "" : "background__red"}`}
        onClick={toggleMicrophone}
      >
        <i
          className={`fa ${isMicrophoneOn ? "fa-microphone" : "fa-microphone-slash"}`}
          aria-hidden="true"
        ></i>
      </div>

      <button id='leave'
        className="options__button"
        onClick={leaveVideoMeeting}
      >
        <i className="fa-sharp fa-solid fa-phone"></i>
      </button>

      <div id="inviteButton" className="options__button">
        <i className="fas fa-user-plus"></i>
      </div>
    </div>
  </Container>

      {!callAccepted && caller && (
       <div className="overlay-container">
       <div className="inner-content">
         <div className="call-info">{`Incoming call from ${caller}`}</div>
         <button className={`button-styles green-button`} onClick={answerCall}>
           Answer
         </button>
         <button className={`button-styles red-button`} onClick={declineCall}>
           Decline
         </button>
       </div>
     </div>
     
      
      )};

      {/* Simulate incoming call button */}
      <div className="fixed top-0 left-0 p-4">
        <button
          className="simulate"
          onClick={simulateIncomingCall}
        >
          Simulate Incoming Call
        </button>
      </div>
      <style>
  {`
    main {
      position: relative;
    }
    .options-container {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3; 
      }
  
      .options__button {
        font-size: 1.5rem;
        margin: 0 10px;
        cursor: pointer;
        background-color:#395886;
        border: none;
        color: white;
        border-radius:20px;
      }
   
  
      .options__button:hover {
        color: #f0f3fa; 
      }
  
    

    .container {
      min-height: 100vh;
      padding: 20px;
      display: flex;
      width: 100%;
      margin: auto;
      flex-wrap: wrap;
    }

    .user-video {
      position: absolute;
      top: 0;
      left: 0;
      height: 30%; 
      max-width: 100%;
      border: 1px solid black;
      padding: 10px;
      margin: 10px;
      border-radius: 15px;
      z-index: 2;
    }
    #leave{
        background-color:red !important;
    }
    .peer-video {
      border: 1px solid black;
      background-color: #ff4d4d;
      border-radius: 15px;
      margin: 10px;
      height: 30%; 
    }

    .caller-screen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    .overlay-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0f3fa;
      color: white;
    }

    .inner-content {
      padding: 16px;
      background-color: white;
      border-radius: 8px;
    }

    .call-info {
      margin-bottom: 16px;
    }

    .button-styles {
      padding: 8px 12px;
      color: white;
      border-radius: 20px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .green-button {
      background-color: #395886;
      margin-top: 10px;
      margin-right: 16px;
    }

    .red-button {
      background-color: #ff4d4d;
    }

    .simulate {
      margin-left: 80vw;
    }
  `}
</style>



    </main>
  );
};

export default VideoCall;

