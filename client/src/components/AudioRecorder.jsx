import React, { useState, useRef } from "react";
import axios from "axios";
import { v1 as uuid } from "uuid";
import { FaFly, FaMicrophone, FaPaperPlane, FaStop, FaTimes } from 'react-icons/fa';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState(null);
  const mediaRecorder = useRef(null);
  const [readyForUpload, setReadyForUpload] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.start();
      mediaRecorder.current.ondataavailable = (e) => {
        setAudio(e.data);
      };
      setRecording(true);
      setReadyForUpload(false); // Reset readyForUpload when starting recording
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
      setReadyForUpload(true);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
      setReadyForUpload(false);
      setAudio(null); // Reset audio data
    }
  };

  const sendVoiceMessage = (voiceMessage) => {
    // Envoyer le message à la base de donnée
    const instance = axios.create({
      withCredentials: true
    });

    instance.post(`${process.env.REACT_APP_API_LINK}messages/send-message/`, {
      sender_id: localStorage["user_id"],
      receiver_id: localStorage["user_id"],
      conversation_id: localStorage["conversation_id"],
      content: voiceMessage,
      message_type: 1
    })
    .then(function (res) {
      console.log(res.data);
      // Reset state after successful upload
      setAudio(null);
      setReadyForUpload(false);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const uploadAudio = async () => {
    if (audio) {
      const formData = new FormData();
      const fileName = "audio_" + uuid();
      formData.append("audio", audio, fileName);
      sendVoiceMessage(fileName);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_LINK}/audio-upload/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={`audio-recorder ${recording ? 'recording' : ''}`}>
      <a onClick={recording ? stopRecording : startRecording}>
        {recording ? <FaStop /> : <FaMicrophone />}
      </a>
      {readyForUpload && (
        <>
          <a onClick={uploadAudio}>
            <FaPaperPlane />
          </a>
          <a onClick={cancelRecording} className="cancel-button">
            <FaTimes />
          </a>
        </>
      )}
      {audio && <audio src={URL.createObjectURL(audio)} controls />}
      <style>
        {`
        .audio-recorder {
          display: flex;
          align-items: center;
        }
        
        .audio-recorder.recording {
          width: 100%;
        }
        
        .audio-recorder audio {
          width: 100%;
          margin-top: 10px;
        }
        `}
      </style>
    </div>
  );
};

export default AudioRecorder;
