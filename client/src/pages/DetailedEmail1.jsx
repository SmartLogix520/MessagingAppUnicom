import React, { useState, useEffect } from 'react';

import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EmailComponent from '../components/emailComponent.jsx';
import { useParams, useNavigate } from 'react-router-dom';
const DetailedEmail1 = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { mailId } = useParams();
  const navigate = useNavigate();
  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
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
      } catch (error) {
        console.error('Error fetching email details:', error);
      }
    };

    fetchData();
  }, [mailId]);

  const [isFavorite, setIsFavorite] = useState(emailData.favoris === 1);

  const ContinueTyping = (event) => {
    event.preventDefault();
  
    // Récupérer les valeurs des champs email, cc, subject et content
    const { email_receiver, cc, subject, content } = emailData;
    
    // Rediriger l'utilisateur vers la page de transfert avec les paramètres appropriés
    window.location.href = `/continuetyping?subject=${encodeURIComponent(subject)}&cc=${encodeURIComponent(cc)}&content=${encodeURIComponent(content)}&email_receiver=${encodeURIComponent(email_receiver)}`;
  };
  

  const markAsFavorite = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_LINK}favoris/marks-fav/${mailId}`);
      setIsFavorite(true); // Met à jour l'état local pour indiquer que l'e-mail est maintenant favori
      window.alert('Email bien ajouté aux favoris');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du champ favoris :', error.message);
    }
  };

  return (
    <main style={{ left: 'auto', right: 'auto', margin: '0' }}>
        <div className='Header'>
                
                <button
  className='buttonHeader'
  title='Go back'
  onClick={() => navigate(-1)} 
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-arrow-left"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l14 0" />
    <path d="M5 12l6 6" />
    <path d="M5 12l6 -6" />
  </svg>
</button>
                {/* <button className='buttonHeader' title='Archive'>
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
                </button> */}
                 <button className='buttonHeader' title='Delete'>
                <a href="/inbox"> <EmailComponent id={emailData._id} /></a>
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
            <p className="tome">{emailData.sender}</p>  
              <div className="dropdown-container">
                <p className='tome'>To me</p>
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
                    <div className="details1">
                      <p className='titre'>Cc:</p>
                      <p  className='info'>{emailData.cc}</p> 
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="body2">
            <p>{emailData.time}</p>
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
        <p className='mailcontent'>{emailData.content}</p>
      </div>
      <div className="body3">
      <button className="buttonFin"  onClick={ContinueTyping}>
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
          Continue typing
        </button>
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
  /*margin-top: 20px;*/
  font-size:15px;
  color:#628ecb;
  margin-right: 0;
}

.body1 img {
    border-radius:100%;
    margin-right: 10px;
    width:50px;
    height: 50px;
}

.dropdown-container {
    position: relative;
    display: flex; 
    align-items: center;
    top:0;
    margin-left:10px;
   
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
}
.body2 p{
    color:#628ecb;
    font-size:14px;
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
    margin-top:1vh;
    word-wrap: break-word;
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
    font-size: 16px;
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
`}
      </style>
    </main>
  );
};

export default DetailedEmail1;