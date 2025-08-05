import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import EmailComponent from '../components/emailComponent.jsx';

const DetailedEmail = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { mailId } = useParams();
// pour le cryptage
const [decryptedContent, setDecryptedContent] = useState('');
const [decriptionKey, setDecriptionKey] = useState('27e9e76101727d351ec7f26cf0cbf3767872958144f5cefbddd0170fd591046b');
const [encryptedContent, setEncryptedContent] = useState('');
const navigate = useNavigate();
  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };
  // pour le cryptage 
  const dataDecrypt = (encryptedText) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, decriptionKey);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return  data;
  };

  // Replace the following placeholder values with actual data from your database
  const [emailData, setEmailData] = useState({
    subject:"your subject",
    email_receiver:"email_receiver",
    content:"content",
    sending_date:"sending_date",
    reception_date:"reception_date",
    email_sender:"email_sender"
  });

  useEffect(() => {
    // Vous pouvez faire une requête à votre backend ici pour obtenir les détails de l'e-mail en utilisant l'ID du mail.
    // Remplacez cette partie par votre propre logique de récupération des données.

    // Exemple fictif d'utilisation d'une fonction fetchData pour obtenir les données.
    const fetchData = async () => {
      try {
        // Remplacez cet appel fictif par votre propre logique pour obtenir les détails de l'e-mail.
        const response = await fetch(`${process.env.REACT_APP_API_LINK}emails/get-one/${mailId}`);
        const data = await response.json();
        console.log(data);
        setEmailData(data); // Mettez à jour l'état avec les données réelles de l'e-mail.
        setDecryptedContent(dataDecrypt(data.content))
      } catch (error) {
        console.error('Error fetching email details:', error);
      }
    };

    fetchData();
  }, [mailId]);
  const replyToEmail = (event) => {
    event.preventDefault();
    // Générer le sujet avec le préfixe "Re:"
    const replySubject = `Re: ${emailData.subject}`;
    
    // Rediriger l'utilisateur vers la page de réponse avec les paramètres appropriés
    window.location.href = `/reply?receiver=${emailData.email_sender}&subject=${encodeURIComponent(replySubject)}`;
  };
  const forwardEmail = (event) => {
    event.preventDefault();
  
    // Générer le sujet avec le préfixe "Fwd:"
    const forwardSubject = `Fwd: ${emailData.subject}`;
    
    // Rediriger l'utilisateur vers la page de transfert avec les paramètres appropriés
    window.location.href = `/forward?subject=${encodeURIComponent(forwardSubject)}&cc=${encodeURIComponent(emailData.email_sender)}&content=${encodeURIComponent(emailData.content)}`;
  };
  const [isFavorite, setIsFavorite] = useState(emailData.favoris === 1);

  const markAsFavorite = async () => {
    try {
      await axios.put(`http://localhost:5000/favoris/marks-fav/${mailId}`);
      setIsFavorite(true); // Met à jour l'état local pour indiquer que l'e-mail est maintenant favori
      window.alert('Email successfully added to favorites');
    } catch (error) {
      console.error('Error updating favorites field :', error.message);
    }
  };

  return (
    <main style={{ left: 'auto', right: 'auto', margin: '0' }}>
        <div className='Header'>
                <button className='buttonHeader' title='Go back'>
                    <Link to='/Inbox'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width={32} height={32} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l14 0" />
                        <path d="M5 12l6 6" />
                        <path d="M5 12l6 -6" />
                    </svg>
                    </Link>
                </button>
                <button className='buttonHeader' title='Archive'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-archive" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                        <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                        <path d="M10 12l4 0" />
                    </svg>
                </button>
                <button className='buttonHeader' title='Report as spam'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-exclamation-circle" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 9v4" />
                        <path d="M12 16v.01" />
                    </svg>
                </button>
                <button className='buttonHeader' title='Delete'onClick={() =>navigate('/inbox')}  >
                <a>  
                <EmailComponent id={emailData._id} /></a>
                </button>
            </div>
      <div className="body">
        <div className="body0">
          <h2>Subject: {emailData.subject}</h2>
        </div>
        <div className="body1">
          {/* <img src={emailData.sender.profileImage} alt="Sender Profile" /> */}
          <div>
          <h4>{emailData.email_sender}</h4>
            <div className="body11">
            <p className="tome">Details</p>  
              <div className="dropdown-container">
                <button className="detail" Title='Show details' onClick={toggleDetails}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-arrow-badge-down-filled"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z"
                      strokeWidth={0}
                      fill="currentColor"
                    />
                  </svg>
                </button>
                {detailsVisible && (
                  <div className="dropdown-content">
                    <div className="details1">
                      <p className='titre'>Subject: </p>
                      <p className='info'>{emailData.subject}</p>
                    </div>
                    <div className="details1">
                      <p  className='titre'>Time:</p> <p  className='info'>{emailData.reception_date}</p>
                    </div>
                    <div className="details1">
                      <p  className='titre'>From:</p>
                      <p  className='info'>{emailData.email_sender}</p>
                    </div>
                    <div className="details1">
                      <p className='titre'>To:</p>
                      <p  className='info'>{emailData.email_receiver}</p> 
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="body2">
            <p className='date'>{emailData.reception_date}</p>
            <button className="buttonBody2" title='Answer'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-arrow-back-up"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 14l-4 -4l4 -4" />
                <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
              </svg>
            </button>
             <button className={`buttonBody2 ${isFavorite ? 'favorite' : ''}`} title='Add to favourites' onClick={markAsFavorite}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
            </button>
  
          </div>
        </div>
      </div>
      <div className="mailcontent-container">

        <p className='mailcontent'>{decryptedContent}</p>
        {/* <h4>{decryptedContent}</h4> */}
      </div>
      <div className="body3">
      <button className="buttonFin"  onClick={replyToEmail}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-back-up"
            width={24}                                                                                                                                                                                                                                                                                       
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 14l-4 -4l4 -4" />
            <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
          </svg>
          reply
        </button>
        <button className="buttonFin" onClick={forwardEmail}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-forward-up"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 14l4 -4l-4 -4" />
            <path d="M19 10h-11a4 4 0 1 0 0 8h1" />
          </svg>
          forward
        </button>




        
        {/* Nouveau code pour le bouton de téléchargement de la pj */}
<div className="mailcontent-container">
  <p className="mailcontent">{emailData.message}</p>
  {emailData.file && (
    <div className="attachment-container">
      <a
        href={`${process.env.REACT_APP_API_LINK}${emailData.file}`}
        target="_blank"
        rel="noopener noreferrer"
        className="download-button"
        title={`Open Attachment: ${emailData.fileName} in New Tab`}
      >
        <span className="button-text">Download</span>
        <span className="file-name">{emailData.fileName}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-download"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5v13" />
          <path d="M5 12l7 7l7-7" />
        </svg>
      </a>
    </div>
  )}
</div>
      </div>
      <style>
        {`
      main{
    left:auto;
    right:auto;
    margin:0;
    overflow:auto;
    height:100%;
    width:100%;
    /*border-radius:20px;*/
    border-style:none;

}

.Header {
    border-bottom: 1px solid #a2d4e4;
}

body {
    background-image: none;
    background-color: #F0F3FA;
}

.buttonHeader {
    margin: 1%;
    box-shadow: none;
    background-color: transparent;
    color: #395886;
}
.buttonHeader svg{
    width:24px;
    height:24px;
}
.body {
   margin-left: 7vw;
    margin-top: 4vh;
   /* border-bottom: 1px solid #a2d4e4;*/
   left:auto;
}

.body0 {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right:0;
}
.body0 h2{
    color:#395886;
    font-family: 'Times New Roman', Times, serif;
    font-size: 25px;
    font-weight: bold;
    margin-top:0;
    margin-bottom:30px;
    margin-right:0;
}
.body1 {
    display: flex;
    /* flex-direction: row; */
    align-items: center;
    /*margin-left: -7vw;*/
    margin-left:0vw;
}
.body1 h4{
    color:black;
    font-family: Arial, Helvetica, sans-serif;
    font-size:15px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom:10px;
    margin-right:10px;
}
.body11 {
    display: flex;
    flex-direction: row;
    align-items: center;
   margin-top: -3vh;
}
.tome {
  margin-top: 1vh;
  font-size:14px;
  color:#628ecb;
  margin-left: 2vw;
  font-weight:normal;
}

.body1 img {
    border-radius:100%;
    margin-right: 10px;
    width:50px;
    height: 50px;
    margin-top: 1vh;
}

.dropdown-container {
    position: relative;
    display: flex; 
    align-items: center;
    top:0;
    margin-left:10px;
    padding:2%;
   
}

.detail  {
    background-color: transparent;
    color: #395886;
    margin-top:0;
    margin-left:0;
}
.detail svg {
    width:24px;
    height:24px;
    margin-top:0;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: auto;
  width: 20vw;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 1px 1px  #a2d4e4;
  margin-top: -1vh;
  background-color: rgba(240, 243, 250, 1);
  padding:10px;
}

.details1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: -3vh;
}
.details1 .titre{
    margin-top:20px;
    font-size: 15px;
    color:#628ecb;
}
.details1 .info{
    margin-top: 20px;
    font-size: 15px;
    color:black;
    margin-left:8px;
}
.body2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left:auto;
    padding-right:2vw;
}
.body2 .date{
    color:#628ecb;
    font-size:14px;
    font-weight:normal;
}
.buttonBody2 {
    font-size: 1.5rem;
    border: none;
    margin-left: 1vw;
    background-color: transparent;
    color: #395886;
}
.mailcontent-container {
  overflow: auto;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 30px;
}
.mailcontent {
    text-align: left;
    color:black;
    margin-left:1.3vw;
    margin-right:2vw;
    font-size:16px;
    margin-top:1vh;
    word-wrap: break-word;
    font-weight:normal;
    line-height: 1.5; /*esapce entre les lignes*/
}
.buttonBody2 svg{
    width:24px;
    height:24px;
}

.body3 {
    display: flex;
    flex-direction: row;
    justify-content: flex-end; 
    margin-right:100px;
}

.buttonFin {
    background-color: #395886;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 40px;
}

.buttonFin svg {
    margin-right: 5px;
}

.buttonFin:hover {
opacity:0.8;
}
.attachment-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.attachment-container p {
  margin-right: 10px;
  color: #777;
  display: flex;
  align-items: center;
}

.download-button {
  background-color: #395886;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 20px; /* Ajustez le border-radius pour une forme ovale */
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  overflow: hidden;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.download-button svg {
  margin-left: 5px;
}

.download-button:hover {
  background-color: #628ecb;
}

.button-text {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
}

.file-name {9
  color: #ccc;
  margin-left: 8px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 1;
}
`}
      </style>
    </main>
  );
};

export default DetailedEmail;