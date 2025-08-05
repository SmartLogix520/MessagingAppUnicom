
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from "socket.io-client";
import InfosUser from '../components/InfosUser';
const socket = io.connect("http://localhost:8000");


const Liste = ({ conversations, onConversationClick, setIsFriendClicked, isFriendClicked }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [messengerContacts, setMessengerContacts] = useState([]);
  const [contactDetails, setContactDetails] = useState(null); // Déclarez contactDetails comme un état
  const [selectedResult, setSelectedResult] = useState(null); 

  const handleClickResult = (username) => {
    setSelectedResult(username); // Set the selected result
  };

  useEffect(() => {
    socket.on("me", (id) => {
      console.log(`Connected to Socket.io server with ID: ${socket.id}`);
      // Listen for the deleteContact event
      socket.on('deleteContact', (deletedContactId) => {
        console.log(`Received deleteContact event on client: ${deletedContactId}`);
        setMessengerContacts((prevContacts) => prevContacts.filter(contact => contact._id !== deletedContactId));
      });
    });
  }, [setMessengerContacts]);

  const getContacts = () => {
    const instance = axios.create({
      withCredentials: true
    });

    const params = {
      username: document.getElementById("search-text").value
    };
   

    instance.get(`${process.env.REACT_APP_API_LINK}users/email-part/`, { params: params })
      .then(function (res) {
        setData(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMessengerContacts = () => {
    const instance = axios.create({
      withCredentials: true
    });

    instance.get(`${process.env.REACT_APP_API_LINK}messenger-contacts/get-contact-list`)
      .then(function (res) {
        console.log(res.data);
        setMessengerContacts(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    localStorage["conversation_id"] = "";
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  const addConversation = (username) => {
    const instance = axios.create({
      withCredentials: true
    });

    const body = {
      username: username,
      user_id: localStorage["user_id"]
    };

    if (localStorage["username"] === username) {
      console.log("Vous ne pouvez pas vous ajouter vous-même à la liste de contacts.");
      return;
    }

    instance.post(`${process.env.REACT_APP_API_LINK}messenger-contacts/`, body)
      .then(function (res) {
        getMessengerContacts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeConversation = (contact_id) => {
    socket.emit('deleteContact', contact_id);
    const instance = axios.create({
      withCredentials: true,
    });

    instance
      .delete(`${process.env.REACT_APP_API_LINK}messenger-contacts/delete-one/${contact_id}`)
      .then(function (res) {
        getMessengerContacts();
      })
      .catch(function (error) {
        console.log(error);
      });
    localStorage.removeItem('conversation_id');
  };

const handleClick = async (friend) => {
  setIsFriendClicked(true);
  let userName = "";
  let contactDetails = null;

  if (localStorage["user_id"] !== friend.contact_id) {
    localStorage["msg_receiver"] = friend.contact_id;
    userName = friend.username;
  } else {
    localStorage["msg_receiver"] = friend.user_id;
    userName = friend.username2;
  }

  // Utiliser l'ID de la conversation pour récupérer les détails du contact
  const conversationId = friend._id;

  // Enregistrer l'ID de la conversation dans le localStorage
  localStorage["conversation_id"] = conversationId;

  console.log("conversation id = " + localStorage["conversation_id"]);
  onConversationClick({
    name: userName,
    image: friend.user_avatar,
  });

  try {
    // Appel de la fonction pour récupérer les détails du contact à partir de l'ID de la conversation
    const contactResponse = await axios.get(`${process.env.REACT_APP_API_LINK}messenger-contacts/getOne/${conversationId}`);
    contactDetails = contactResponse.data;
    console.log(contactDetails)
    
    sessionStorage["first_name"] = contactDetails.first_name
    sessionStorage["username"] = contactDetails.username
    sessionStorage["last_name"] = contactDetails.last_name
    sessionStorage["email"] = contactDetails.email
  

    // Passer les détails du contact au composant InfosUser
    displayContactDetails(contactDetails);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du contact :", error);
    // Gérez l'erreur si nécessaire
  }
};

const displayContactDetails = (contactDetails) => {
  // Afficher les détails du contact dans le composant InfosUser
  setIsFriendClicked(false); // Assurez-vous que le composant InfosUser est affiché
  setContactDetails(contactDetails); // Définissez les détails du contact pour les afficher dans InfosUser
};

  const getUsername = (user) => {
    const username = user.user_id === localStorage["user_id"] ? user.username : user.username2;
    return username;
  };

  useEffect(() => {
    getMessengerContacts();
  }, []);

  return (
    <div className="relative inline-block w-full lg:w-1/4">
    <div className="sticky top-0 bg-white p-3">
    <a onClick={toggleDropdown} className="newconvo">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </span> New message
    </a>

    {showDropdown && (
<div id='dropdown' className="absolute top-0 mt-12  bg-white rounded shadow-md w-full lg:w-auto">
  <div className="text-sm p-3">
    <div className='flex align-middle gap-3 place-content-between'>
      <input id="search-text" type="text" placeholder="Search for a friend.." className="search" onChange={() => getContacts()} />
     
    </div>

    <ul className="results-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
      {data?.map((i) => (
        <li key={i.username}>
          <button id='results'
            className={`results ${selectedResult === i.username ? 'selected' : ''}`}
            onClick={() => {
              handleClickResult(i.username);
              addConversation(i.username);
            }}
          >
            {i.username}
          </button>
        </li>
      ))}
    </ul>
  </div>
<div className='ddbuttons'>
<button className='add' onClick={() => { getMessengerContacts(); toggleDropdown(); }}>
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 5l0 14" />
  <path d="M5 12l14 0" />
</svg>
   <p>Add</p> 
</button>
<button className="cancel" onClick={toggleDropdown}>
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M18 6l-12 12" />
<path d="M6 6l12 12" />
</svg> <p>cancel</p>
</button></div></div>
)}

</div>

      {/* <div className="">
        <div className="p-2">
          <input type="text" placeholder="🔍 Search..." className="w-full rounded-lg border-blue-500 " />
        </div>
        <div> */}
          <div>
         <div  className="overflow-y-auto h-[calc(100vh-4rem)] max-h-96">
          <ul>
            {messengerContacts.map((friend) => (
              <li className="mx-2" key={friend.contact_id} onClick={() => handleClick(friend)}>
                <div id='user' className='flex items-center mb-4'>
                  <img src={friend.user_avatar} alt={friend.first_name} height={50} width="50" className="rounded-full chat-img" />
                  <div className="ml-2">
                    <h5 className='userName'>{getUsername(friend)}</h5>
                    <p className="text-xs">{friend.time}</p>
                  </div>
                  <div className="flex-container">
                    {friend.user ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="user-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="user-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                      </svg>
                    )}
                    <a
                      className="text-red-500 mx-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeConversation(friend._id);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>
      {`
       .side{
        background-color: #f0f3fa;
        border-radius:20px;
        padding: 10px;
        width: 220px;
        display: flex;
        flex-direction: column;
        align-items: left;
        font-family: Arial, Helvetica, sans-serif;
        border:none;
        position:sticky;
        font-size:15px;
        
      }
       #dropdown{
        border-radius:20px;
        left:20%;
       }
        body {
          border-color: transparent;
          border-radius:20px;
          padding:0;
          top:20vh;
          margin-bottom:0;
          background-color:transparent;
        }
        .newconvo {
          background-color: #395886;
          color: white;
          padding: 2vh 1vw;
          display: flex;
          margin: 2%;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          color: white;
        }
        .newconvo span svg {
          font-size: 10px;
          margin-left: 3px;
        }
        .sticky {
          position: sticky;
          z-index: 1;
        }
        .results-list {
          list-style: none;
          padding: 0;
        }
        
        .results {
          text-align: left;
          width: 100%; 
          background-color: #f0f3fa; 
          padding: 8px; 
          color:black;
          border-radius:20px;
        }
        
        .results.selected {
          background-color: #b1c9ef; 
          
        }
        

        .overflow-y-auto {
          overflow-y: auto;
        }
.search{
           border-color:#628ECB;
           border-radius:20px;
           margin-bottom:2px;
        }
        .search:placeholder{
          color:#628ECB;
          font-size:14px;
       }
        .h-[calc(100vh-4rem)] {
          max-height: calc(10vh - 4rem);
        }
        .userName {
          align-self: flex-start;
          font-weight: bold;
          color: #395886;
        }
        .supp {
          background-color: transparent;
          color: #395886;
        }
        #user{
          background-color:#f0f3fa;
          margin-bottom:3px;
          border-radius:20px;
          pointer:cursor;
        }
         #user.selected {
      background-color: #b1c9ef;
    }
        #user:hover{
          background-color:#d5deef;
          pointer:cursor;
        }
        .contactInfo {
          width: 30vw;
        }
        input::placeholder {
          color: #628ecb !important;
          font-size: 14px;
        }
        .flex-container {
          display: flex;
          margin-left: auto;
          align-items: center;
        }
        .user-circle,
        .trash {
          margin-right: 8px;
        }
        .user-circle {
          color: #395886;
        }
        .absolute {
          position: absolute;
        }
        .top-0 {
          top: 0;
        }
        .mt-12 {
          margin-top: 3rem;
        }
        li{
          padding:0;
        }
        .bg-white {
          background-color: white;
        }
        .border {
          border: 1px solid #ccc;
        }
        .rounded {
          border-radius: 5px;
        }
        .shadow-md {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .ddbuttons{
          display:flex;
          justify-content:center;
          right:auto;
          left:auto;
          margin-bottom:4px;
        }

        .add{
          display:flex;
          color:white;
          background-color:#395886;
          border-radius:20px;
          padding: 3px 8px;
          margin-right:5px;
        }
        .add svg,
        .cancel svg{
          width:15px;
          margin-right:2px;
        }
        .add p,
        .cancel p{
          font-size:0.9em;
        }
        .cancel{
          display:flex;
          color:white;
          background-color:red;
          border-radius:20px;
          padding: 3px 8px;
        }
        ul li .results{

          background-color:transparent;
          color:black;
          text-align: left !important; 
        }
        a{
          cursor: pointer;
        }
        a:hover{
          opacity:0.7;
        }
      `}
      </style>
    </div>

  );
};

export default Liste;
