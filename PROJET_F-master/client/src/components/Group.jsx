
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faUser,
  faEdit,
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useScrollToBottom } from "react-scroll-to-bottom";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from 'axios';

function Group() {
  // const [groupName, setGroupName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newMember, setNewMember] = useState("");
  // const [isEditing, setIsEditing] = useState(false);
  // const [tempGroupName, setTempGroupName] = useState(groupName);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isMOpen, setIsMOpen] = useState(false);
  const [newGroupMembers, setNewGroupMembers] = useState("");
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
 const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
 const [currentGroupIndex, setCurrentGroupIndex] = useState([]);
 const [selectedGroupName, setSelectedGroupName] = useState("");
 const [isRenamingConversation, setIsRenamingConversation] = useState(false);
 const [newGroupName, setNewGroupName] = useState(selectedGroupName);
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [groupId, setGroupId] = useState(null);
 const [userGroups, setUserGroups] = useState([]);
 const [members, setMembers] = useState([]);
 const [groups, setGroups] = useState([]);
 const [newMessagesCount, setNewMessagesCount] = useState(0);
 const location = useLocation();
 const [loadingMessages, setLoadingMessages] = useState(false);
 const conversationRef = useRef(null);
 const [loading, setLoading] = useState(false);


  const selectedOptionFromPath = location.pathname.replace('/', '');
  const [selectedOption, setSelectedOption] = useState(selectedOptionFromPath || "inbox"); // Valeur par défaut : "inbox"

 

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };  

 
// Gestion centralisée des erreurs
const handleFetchError = (error, action) => {
  console.error(`Erreur lors de ${action} :`, error);
  // Traitez l'erreur ici, par exemple afficher un message d'erreur à l'utilisateur
};

// Fonction générique pour les appels réseau avec gestion centralisée des erreurs
const fetchData = async (url, action, setData) => {
  try {
    const response = await axios.get(url);
    setData(response.data);
  } catch (error) {
    handleFetchError(error, action);
  }
};
useEffect(() => {
  // Fetch the new messages count or update it using your logic
  // For now, setting it to a static value for demonstration purposes
  setNewMessagesCount(3); // Set to the actual count of new messages
}, []); // You might want to trigger this effect based on events or data changes

const handleCancelCreation = () => {
  // Mettez ici le code nécessaire pour annuler la création du groupe
  // Par exemple, réinitialisez les états utilisés pour la création du groupe
  setNewGroupName("");
  setNewGroupMembers("");
  setIsCreatingGroup(false);
};


// Affichage des messages (sans réappeler fetchMessages)
const displayMessages = () => {
  messages.forEach(message => {
    console.log(`De: ${message.sender.name}, Message: ${message.content}`);
  });
};

  
  const handleAddMember = async () => {
    try {
      if (newMember.trim() === "") {
        return; // Ne rien faire si newMember est vide ou contient uniquement des espaces
      }
  
      const group = userGroups[currentGroupIndex];
  
      if (!group) {
        console.error('Invalid currentGroupIndex or groups array.'); // Gérer le cas où le groupe actuel n'est pas valide
        return;
      }
  
      if (group.members.includes(newMember)) {
        alert(`${newMember} is already a member of this group.`);
        return;
      }
      const response = await axios.put(`${process.env.REACT_APP_API_LINK}messages/addmember-group/${group._id}`, {
        groupId: group._id, // Ajouter l'ID du groupe à la requête
        username: newMember,
      });
  
      const updatedMembers = response.data; // Assurez-vous que votre API renvoie les membres mis à jour du groupe

  
      // Mise à jour de l'état local
      setMessages([
        ...messages,
        { user: "System", content: `${newMember} has joined the group.` },
      ]);
  
      setNewMember("");
  
      setGroups((prevGroups) => {
        const updatedGroups = [...prevGroups];
        const updatedGroup = { ...group, members: updatedMembers };
        updatedGroups[currentGroupIndex] = updatedGroup; // Mettez à jour le groupe spécifique
        return updatedGroups;
      });
    
    } catch (error) {
      console.error('Error adding member:', error.message);
      // Gérer l'erreur (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  


const handleMenuToggle = () => {
  setIsMenuOpen(!isMenuOpen);
};


const handleMToggle = (index) => {
  setSelectedMessageIndex(index);
  setIsMOpen(!isMOpen);
};


const handleDeleteConversation = () => {
  
  setMessages([]); // Efface les messages
  setGroups((prevGroups) => {
    const updatedGroups = [...prevGroups];
    if (currentGroupIndex !== null) {
      updatedGroups[currentGroupIndex].messages = []; // Efface les messages du groupe
    }
    return updatedGroups;
  });
};


const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleSendMessage();
  }
};

//http://localhost:5000/messages/remove-Member/${groupId}


  const handleDeleteMember = async ( member) => {
    if (window.confirm(`Are you sure you want to remove ${member} from the group?`)) {
      try {
        const group = userGroups[currentGroupIndex];
      
      if (!group) {
        console.error('Invalid currentGroupIndex or groups array.'); // Gérer le cas où le groupe actuel n'est pas valide
        return;
      }
        const url = `${process.env.REACT_APP_API_LINK}messages/remove-Member/${group._id}`;
  
        // Effectuer une requête DELETE pour supprimer le membre du groupe
        const response = await axios.delete(url, {
          data: { username: member }, // Passer les données dans le corps de la requête
        });
  
        if (response.status !== 200) {
          throw new Error('Failed to remove member from group');
        }
  
        // Mettre à jour l'état des messages
        setMessages([
          ...messages,
          { user: "System", content: `${member} has left the group.` },
        ]);
  
        // Mettre à jour l'état des groupes
        setUserGroups((prevGroups) => {
          const updatedGroups = [...prevGroups];
          if (currentGroupIndex !== null) {
            const updatedMembers = updatedGroups[currentGroupIndex].members.filter((m) => m !== member);
            updatedGroups[currentGroupIndex].members = updatedMembers;
          }
          return updatedGroups;
        });
      } catch (error) {
        console.error(error.message);
        // Gérer les erreurs ici
      }
    }
  };
  





  const handleDeleteMessage = async (messageId, groupId) => {
    if (window.confirm(`Are you sure you want to remove this message from the group?`))
    try {
      const instance = axios.create();
      const response = await instance.delete(`${process.env.REACT_APP_API_LINK}messages/deleteGroupMessage/${messageId}`, {
        data: { groupId: groupId },
      });
      
      setMessages(messages.filter(message => message._id !== messageId));
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message); // Afficher le message d'erreur depuis la réponse
      } else if (error.request) {
        console.error('Aucune réponse reçue:', error.request);
      } else {
        console.error('Erreur lors de la requête:', error.message);
      }
    }
  };
  


const handleRenameConversation = ( newGroupName) => {
  try {
    const group = userGroups[currentGroupIndex];
      
    if (!group) {
      console.error('Invalid currentGroupIndex or groups array.'); // Gérer le cas où le groupe actuel n'est pas valide
      return;
    }
    const response = axios.put(`${process.env.REACT_APP_API_LINK}messages/rename/${group._id}`, {
      newGroupName: newGroupName
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


const handleSaveRename = () => {
  setIsRenamingConversation(false);
  if (currentGroupIndex !== null) {
    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      updatedGroups[currentGroupIndex].name = newGroupName;
      return updatedGroups;
    });
  }

  setSelectedGroupName(newGroupName);
};


  const handleLeaveGroup = () => {
    
    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      if (currentGroupIndex !== null) {
        updatedGroups.splice(currentGroupIndex, 1);
      }
      return updatedGroups;
    });
    setShowLeaveConfirmation(false);
    setCurrentGroupIndex(null);
    setMessages([]);
    setSelectedGroupName("");
  };

  
  const handleCreateGroup = async () => {
    if (newGroupName.trim() !== "" && newGroupMembers.trim() !== "") {
      try {
        const instance = axios.create({
          withCredentials: true
        });
        
        const response = await instance.post(`${process.env.REACT_APP_API_LINK}messages/create-group`, {
          groupName: newGroupName,
          members: newGroupMembers.split(",").map((member) => member.trim()),
        });
        
        const newGroup = response.data;
        const updatedGroups = [...groups, newGroup];
        
        // Save updated groups to local storage
        // localStorage.setItem('groups', JSON.stringify(updatedGroups));
        
        setGroups(updatedGroups);
        setNewGroupName("");
        setNewGroupMembers("");
        setIsCreatingGroup(false);
      } catch (error) {
        console.error('Error creating group:', error.response ? error.response.data : error.message);
        alert('An error occurred while creating the group.');
      }
    } else {
      alert("Group Name and Members are required.");
    }
  };
  


  
  
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" && currentGroupIndex !== null && userGroups ) {
        const group = userGroups[currentGroupIndex];
        if (group && group._id) {
            const groupId = group._id;
            const newUser = localStorage["user_id"];
            

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_LINK}messages/send-toGroup/${groupId}`, {
                    sender_id: newUser,
                    messageContent: newMessage,
                });

                if (response.status === 200) {
                    const newMessageData = { user: newUser, content: newMessage };
                    setMessages((prevMessages) => [...prevMessages, newMessageData]);
                    setNewMessage("");

                    setUserGroups((prevGroups) => {
                        const updatedGroups = [...prevGroups];
                        if (currentGroupIndex !== null) {
                            updatedGroups[currentGroupIndex].messages.push({
                                user: newUser,
                                content: newMessage,
                            });
                        }
                        return updatedGroups;
                    });
                    fetchGroupMessages(groupId);

                } else {
                    console.error('Failed to send message:', response.data.message);
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        } else {
            console.error('Group or group ID is undefined');
        }
    } else {
        console.error('Invalid currentGroupIndex or groups are not defined');
    }
};

const handleSwitchGroup = (index) => {
  setCurrentGroupIndex(index);
  fetchGroupMessages(userGroups[index]?._id);
  fetchGroupMembers(userGroups[index]?._id);
  setNewMember(userGroups[index]?.members)
  // setMessages(userGroups[index]?.messages || []);
  setSelectedGroupName(userGroups[index]?.name || "");
};







  useEffect(() => {
      
    // Appel à l'API pour récupérer les groupes de l'utilisateur
    const fetchUserGroups = async () => {
      try {
        const instance = axios.create({
          withCredentials: true
        });
        const response = await instance.get(`${process.env.REACT_APP_API_LINK}/messages/get-member-groups` );
        setUserGroups(response.data);
  
      } catch (error) {
        console.error("Error fetching user groups:", error);
      }
    }
    fetchUserGroups();
  }, [userGroups]);
  


 
    const fetchGroupMembers = async (groupId) => {
      try {
        // Vérifier si userGroups est défini et s'il contient des éléments
        if (!userGroups || userGroups.length === 0) {
          console.error("userGroups n'est pas défini ou est vide.");
          return;
        }
        // Vérifier si currentGroupIndex est un nombre entier valide
        if (
          typeof currentGroupIndex !== "number" ||
          currentGroupIndex < 0 ||
          currentGroupIndex >= userGroups.length
        ) {
          console.error("currentGroupIndex est invalide.");
          return;
        }
        
        //  const groupId = userGroups[currentGroupIndex]._id
        const instance = axios.create({
          withCredentials: true
        });
        const response = await instance.get(`${process.env.REACT_APP_API_LINK}messages/get-group-members/${groupId}` );
        setMembers(response.data); // Mettre à jour l'état avec les membres récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des membres du groupe:', error);
      }
    }


  useEffect(() => {
    // Appeler la méthode handleSwitchGroup avec l'index du groupe actuel
    if (currentGroupIndex !== null) {
      handleSwitchGroup(currentGroupIndex);
      
    }
  }, [currentGroupIndex]);


const fetchGroupMessages = async (groupId) => {
  try {
    // Vérifier si groupId est défini
    if (!groupId) {
      console.error("L'ID du groupe n'est pas défini.");
      return;
    }
    setLoadingMessages(true); // Set loading state to true before fetching messages

    const instance = axios.create({
      withCredentials: true
    });

    const response = await instance.get(`${process.env.REACT_APP_API_LINK}messages/get-group-messages/${groupId}`);
    if (!Array.isArray(response.data.messages)) {
      console.error("La réponse du serveur n'est pas un tableau de messages.");
      return;
    }
    setMessages(response.data.messages);
    
     // Retourner les messages  récupérés
  } catch (error) {
    console.error('Erreur lors de la récupération des messages du groupe:', error);
    throw error; // Gérer ou propager l'erreur
 
  } finally {
    setLoadingMessages(false); // Set loading state to false once messages are fetched (whether successful or not)
  }
};


// useEffect(() => {
//   handleDeleteMessage(messageId,groupId);
// }, [groupId]);

useEffect(() => {
  // Appeler la méthode fetchGroupMessages avec l'ID du groupe actuel
  if (currentGroupIndex !== null) {
    const currentGroupId = userGroups[currentGroupIndex]?._id;
    if (currentGroupId) {
      fetchGroupMessages(currentGroupId);
    }
  }
}, [currentGroupIndex, userGroups]);
useEffect(() => {
  if (loading) {
    setLoading(false);
    scrollToBottom();  // Scroll to the bottom when messages are loaded
  }
}, [messages]);

const scrollToBottom = () => {
  if (conversationRef.current) {
    conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }
};
// Fetch messages when groupId changes

const handleDeleteGroup = () => {
  // Demander une confirmation avant la suppression
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce groupe?");
  
  if (confirmDelete) {
    // Logique de suppression du groupe ici
    setIsCreatingGroup(false);
  }
};
  

return (
    
  <main style={{ left: 'auto', right: 'auto', margin: 'auto' }}>
  <div className="dashboard-container">
  <div className="left">
      <ul className="leftoptions">
      <li className={`option ${selectedOption === "inbox" ? "selected" : ""}`}>
          <a href="/inbox" onClick={() => handleOptionClick("inbox")}>
        <span className="text-gray-800 text-small" title='Emails'>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-mail"
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
    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
    <path d="M3 7l9 6l9 -6" />
  </svg>
 
</span>
          </a>
          </li>
          <li class="option">
          <li className={`option ${selectedOption === "messenger" ? "selected" : ""}`}>
          <a href="/messenger" onClick={() => handleOptionClick("messenger")}>
                    <span className="text-gray-800" title='Chat'>
                    <svg xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-message-circle" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
                    </svg>
                    {/* {newMessagesCount > 0 && <span className="dot" />} */}
                    </span>
                </a>
                </li>

                </li>
                <li className={`option ${selectedOption === "profile" ? "selected" : ""}`}>
          <a href="/profile" onClick={() => handleOptionClick("profile")}>
                        <span class="text-gray-800" title='Profile'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                            </svg>
                        </span>
                    </a>
                </li>
                <li className={`option ${selectedOption === "group" ? "selected" : ""}`}>
          <a href="/group" onClick={() => handleOptionClick("group")}>
                        <span class="text-gray-800" title='GroupChats'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users-group" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                        </svg>
                        </span>
                    </a>
                </li>
                {/* <li class="option">
                    <a href="/contacts">
                        <span class="text-gray-800" title='Contacts'>
                        <i class="fa fa-address-card-o" aria-hidden="true"></i>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-address-book" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
                                <path d="M10 16h6" />
                                <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M4 8h3" />
                                <path d="M4 12h3" />
                                <path d="M4 16h3" />
                            </svg>
                        </span>
                    </a>
                </li> */}
            </ul>
 
      <style>
        {`
        
          .left {
            background-color: #b1c9ef;
            width: 4vw;
            border-radius: 20px;
            top: 8.7vh;
            margin-left: 5px;
            margin-bottom: 4px;
            position: fixed;
            height: 100vh;
          }
          .option.selected {
            background-color: #d4dfe3; /* Couleur du fond sélectionné (bleu foncé) */
            border-radius: 80%; /* Bordure circulaire */
            margin: 5px; /* Ajoutez une marge autour du fond sélectionné */
            padding: 6px; /* Ajoutez un rembourrage pour augmenter la taille */
          }
          .leftoptions {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            margin-top: 18vh;
          }
          .option {
            margin-bottom: 15px;
          }
          .text-gray-800 {
            position: relative;
            display: inline-block;
          }
          
          .dot {
            background-color: red;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            position: absolute;
            top: 0;
            right: 0;
          }
          .unread-count {
            background-color: red;
            color: white;
            padding: 2px 5px;
            border-radius: 50%;
            font-size: 12px;
            position: absolute;
            top: 50%;
            left: 70%; /* Vous pouvez ajuster la position en fonction de votre mise en page */
            transform: translate(-50%, -50%);
          }
          
        `}
      </style>
    </div>

    {/* Partie 2 (Groupes) */}
    <div className="servers-container">
      <div className="groupe-name">
        {/* {isEditing ? (
          <React.Fragment>
            <input
              type="text"
              value={tempGroupName}
              onChange={(e) => setTempGroupName(e.target.value)}
            />
            <button onClick={handleSaveEdit}>Save</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span>{groupName}</span>
            <button onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </React.Fragment>
        )} */}
      </div>
      {/* Message initial */}
      <div 
        className={`add-server ${currentGroupIndex === null ? "active" : ""}`}
        onClick={() => setIsCreatingGroup(true)}
      > 
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width={22} height={22} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        <h1>Create a new Group</h1>
      </div>

      {!groups.length && (
        
        <div >
      <span style={{ color: '#8AAEE0', fontWeight: 'bold' , marginBottom:'50px' }}>
            Create a group to start a conversation.
          </span>
        </div>
      )}
       {/* Formulaire pour créer un groupe */}

{isCreatingGroup && (
        
        <div className="server-circle">
          <input
            type="text"
            placeholder="Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Members "
            value={newGroupMembers}
            onChange={(e) => setNewGroupMembers(e.target.value)}
          />
          <button onClick={handleCreateGroup}>Create </button>
          <button className="cancel-button" onClick={handleCancelCreation}>
 Cancel
</button>

        </div>
      )}
     
      {/* Liste des groupes */}
      {userGroups.map((group, index) => (
        
        <div
          key={index}
          className={`server-circle ${
            currentGroupIndex === index ? "active" : ""
          }`}
          onClick={() => handleSwitchGroup(index)}
        >
          
          <span>{group.name}</span>
        </div>
        
      ))}
     
      
     
    </div>



    {/* Partie 3 (Chatbox avec 40% de la largeur) */}
    <div className="chatbox-container">

    {currentGroupIndex !== null && (
<div className="discussion-title">

 <style>
    {`
      /* Ajoutez vos styles spécifiques ici */
      .discussion-title h1 {
        position: relative;
        background-color:#B1C9EF;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: -20px;
        margin-left: -10px;
        width: calc(100% + 20px);
      }
    `}
  </style>

{isRenamingConversation ? (
  <div className="rename-container">
            <React.Fragment>
              
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <button onClick={handleSaveRename}>Save</button>
            </React.Fragment>
            </div>
          ) : (
            <div className="group-name-display">
            <React.Fragment>
              <h1>{selectedGroupName}</h1>
              
            </React.Fragment>
            </div>
          )}
</div>



)}       
      
      <div className="messages">
        {messages.map((message, index) => (
             <div
                key={index}
                 className={`message ${message.sender_id ? "sent" : "received"}`}
                
              >
              
                <span className="content">{message.content}</span>
    <div onClick={() => handleMToggle(index)}>
      {message.user === "CurrentUser" && (
                  
    
      
        <button
        style={{
          backgroundColor: 'red',

          color: '#fff',
          border: 'none',
          padding: '2px 1px',
          cursor: 'pointer',
          borderRadius: '20px',
          marginTop: '0.1vh',
          marginRight:'-5vw',
          
        }}
          onClick={() => handleDeleteMessage( message._id,groupId)}>
             <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="12" height="12" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
        </button>
              
              )}
  </div>
</div>
))}
         </div>

         <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            
            onKeyPress={handleKeyPress} 
          />
          <button onClick={handleSendMessage}><svg xmlns="http://www.w3.org/2000/svg" class="telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg></button>
        </div>
      </div>
    

    {/* Partie 4 (Liste des membres du groupe) */}
    <div className="members-container">
      <div className="title-membre">
        <h2>Members</h2>
      </div>
      <div className="list-member">
        <ul>

        <li>
            <input
              type="text"
              placeholder="New Member"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
            <button onClick={handleAddMember}><svg xmlns="http://www.w3.org/2000/svg" className="plus" width={20} height={20} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M12 5l0 14" />
<path d="M5 12l14 0" />
</svg></button>

          </li>
          {/* Affichez la liste des membres du groupe ici */}
          {userGroups[currentGroupIndex]?.members.map((member, index) => (
            // <li key={index}>{member}</li>
            <li key={index} style={{ backgroundColor: '#D5DEEF', padding: '10px', marginBottom: '10px', borderRadius: '20px' , border:' 1px solid #628ecb',}}>
           
            {member}

            <button
    onClick={() => handleDeleteMember(member)}
    className="delete-button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="trash" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M4 7l16 0" />
<path d="M10 11l0 6" />
<path d="M14 11l0 6" />
<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>
  </button>

         </li>
         ))} <br></br>
         
        </ul>
      </div>
    </div>
  </div>
  <style>
      {`
html, body {
margin: 0;
padding: 0;
height: 100%;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
overflow:hidden;
}

.dashboard-container {
display: flex;
height: 100vh;
margin: 0;
backgroundColor: bg-slate-100;
 borderRadius: 8px;
 
}
h2{
font-weight:bold;
color:#395886;
margin-bottom:5vh;
}
h1{
font-weight:bold;
font-size:100%;
}

.topbar-container,
.groupe-container,
.chatbox-container,
.members-container {
// background-color: #fff;
color: #333;
padding: 20px;
margin: 0 5px;
overflow: hidden;

border: 2px solid #ddd;
}
.members-container{
background:#F0f3fa;
}

.topbar-container {
//background-color: blue;
display: flex;
justify-content: space-between;
align-items: center;
}

.back-topbar {
z-index: 10;

padding: 8px;
border-radius: 0 0 5px 5px;
// width: 10px;
}

.topbar-icons {
display: flex;


}

.topbar-icons svg {
margin-right: 10px;
}

.groupe-container {
width: 100px;
background-color: red;
padding: 10px;
border-radius: 10px;
background-color: black;

}

.groupe-name {
display: flex;
align-items: center;
margin-bottom: 10px;
}

.groupe-name input {
border: none;
background-color: transparent;
color: #fff;
font-size: 16px;
margin-right: 10px;
padding: 5px;
border-radius: 5px;
width: 100%;
}


.groupe-name button {
background-color: red;
border: none;
color: #fff;
padding: 5px 10px;
cursor: pointer;
border-radius: 5px;
margin-left: 5px;
}

.chatbox-container {
display: flex;
flex-direction: column;
// flex: 4;
height: 100%;
overflow-y: auto;
background: white;
border-radius: 10px;
width: 80vw;

}

.chatbox {
flex: 1;
display: flex;
flex-direction: column;
overflow-y: auto;
border-radius: 10px;
position: relative;
scroll-behavior: smooth;
}

.messages {
flex: 1;
padding: 1px;
overflow: hidden;
border-radius: 10px;
overflow-y: scroll;

}

.message {
margin-bottom: 10px;

border-radius: 20px;
//display: flex;

justify-content: flex-center; 

margin-left: 40vw; 

}



// .message {
//   /* Styles par défaut pour tous les messages */
//   padding: 8px;
//   border-radius: 8px;
//   margin-bottom: 8px;
//   max-width: 70%;
// }

.sent {


color: white;
align-self: flex-end;
}

// .received {
// margin-left:10vw;
// background-color: #B1C9EF;
// color: black;
// align-self: flex-start;
// }

.message.system-message {
text-align: center;
// background-color: #f0f3fa; /* Couleur de fond pour les messages système */
margin: 10px 50px;
padding: 10px;
border-radius: 10px;
}




.message span {
background-color: #395886;
color:white;

 padding: 5px;
border-radius: 20px;
// width: 100%;
text-align: center;
}


.user-avatar {
width: 30px;
height: 30px;
border-radius: 50%;
margin-right: 10px;
}

.user-name {
font-weight: bold;
margin-right: 5px;
}

.message-content {
color: red;
}
.message-input {
display: flex;
align-items: center;
padding: 10px;
right:10px;
}

.message-input input {
flex: 1;
border: 1px solid #ddd;
border-radius: 20px;
height: 7.5vh;
margin-right: 10px;
padding: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

}

.message-input button {
background-color: transparent;
color:#395886;
border: none;
width: 60px;
padding: 10px;
cursor: pointer;
border-radius: 20px;



}
.message-input button :hover{
background-color:#395886;
color:white;
  border: none;
  font-size: 15px;
  padding: 2px 5px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 18px;
  
}
.telegram :hover {
color:white;


}


.title-membre h2 {
font-size: 1.5rem

}

.list-member li {

border-radius: 5px;
padding: 5px;
margin-bottom: 10px;
display: flex;
align-items: center;
text-decoration: none;
position: relative; 

}

.list-member li input {
flex: 1;
border: 1px solid #628ecb;
border-radius: 20px;
padding: 5px 10px;
margin-right: 18px;
min-width: 10vw;

transition: all 0.3s ease;  
}
.list-member li input::placeholder{
font-size:14px;
color:#628ecb !important;
}

.list-member li input:hover {
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);  
}
.list-member li button {
color: #395886;
background-color:transparent;
border: none;

padding: 2px;
cursor: pointer;
border-radius: 20px;
position: absolute;
right: -1vw;
top: 40%;
transform: translateY(-50%);

}

/* Responsive styles */
@media (max-width: 768px;min-width: 700px) {
.dashboard-container {
  flex-direction: column;
}

.groupe-container {
  width: 100%;
  margin-bottom: 10px;
}

.members-container {
  margin-right: 5px;
}
.chatbox-container {
  width: 100%;
}

.discussion-title {
  width: 100%; /* Largeur de 100% pour les écrans plus petits */
}



}


.servers-container{
background:#F0F3FA;
width:40vw;
margin-left:70px;
overflow-y:scroll;

}


.server-circle.active {

  flex: 1;
  border: 1px solid #628ecb;
  border-radius: 20px;
  padding: 8px 10px;
  margin-right: 18px;
  background-color:#B1C9EF;

transition: all 0.3s ease;  
}
.server-circle.active ::placeholder{
  font-size:14px;
color:#628ecb !important;
}

.server-circle.active :hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);  
}

.server-circle {
border-radius: 20px;
align-items: center;
margin-top: 10px !important;

 //width: 15vw; 
padding: 10px;
font-size:1.3rem;
fontWeight: bold;
color: black; 
border: 1px solid #ccc;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
margin: 0 10px


}

.server-circle input {
flex: 1;
border: 1px solid #628ecb;
border-radius: 20px;
padding: 5px 10px;
width:12vw;
margin-right: 18px;
margin-bottom:2vh;
transition: all 0.3s ease;  
}
.server-circle input::placeholder{
font-size:14px;
color:#628ecb !important;
}

.server-circle input:hover {
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);  
}




.server-circle button {
background-color: #395886;
color: #fff;
font-size:1rem;
border: none;
padding: 5px;
border-radius: 20px;
cursor: pointer;
transition: background-color 0.3s ease;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

}

.server-circle button:hover {
background-color: #628ECB;
}
.server-circle span{
font-size:18px;
margin-right:10vw;
font-weight:bold;


}

// .cancelbutton-:hover {
//   background-color:red;
//   color:red; /* Effet de soulignement au survol */
// }
.server-circle.group-created {
background-color: B1C9EF; 
color: black  ; 
font-size:1.3rem;
 width: 15vw; /* Ajoutez la largeur souhaitée */
padding: 10px;
margin-left:50px;
border-radius: 20px;


}


{*/.server-circle.group-created input,
.server-circle.group-created button {
background-color: black; 
color: red; 
font-size:1.3rem;
 width: 300px; /* Ajoutez la largeur souhaitée */
padding: 10px;
}*/}


.options-menu {
cursor: pointer;
position: relative;
margin-left:45vw;
top:-35px;
font-size: 14px;


}

.options-menu-content {
position: absolute;
top: 40px; 
right: 0;
background-color: #F0F3FA;

box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 5px;
padding: 10px;
z-index: 1;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
color: #000; 
}

.options-menu-content button {
width: 100%;
text-align: left;
padding: 5px;
border: none;
background: none;
cursor: pointer;
color: #000;  border-bottom: 1px solid #000;
}



.my-message {
  
  background-color: red;  // Exemple de couleur de fond verte
  color: red;  
}



.add-server {
  background-color: #395886;
  color: #fff;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  margin:0 20px;

}

.add-server:hover {
  background-color: #2d4561;
}

.trash{
  color:red;
  border: none;
  font-size: 12px;
  padding: 2px 5px;
  width: 3vw;
  height: 4vh;
  cursor: pointer;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 18px;
  transition: background-color 0.3s ease;
}

.trash:hover {
  background-color: #ff4444;  
  color:white;
}


.leave-confirmation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
}

.leave-confirmation p {
  font-size: 16px;
  margin-bottom: 20px;
}

.leave-confirmation button {
  background-color: #395886;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.leave-confirmation button:hover {
  background-color: #2d4561;
}

.leave-confirmation button:last-child {
  background-color: #ddd;
  color: #333;
}

.leave-confirmation button:last-child:hover {
  background-color: #ccc;
}

.rename-container {
  
  align-items: center;
}

.rename-container input {
  flex: auto;
  border: 1px solid #ddd;
  
  margin-right: 10px;
}

.rename-container button {
  background-color: #395886;
  color: #fff;
  padding: 2px 8px;
  border: none;
  
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.rename-container button:hover {
  background-color: #2d4561;
}



`}
      </style>
  </main>
);
}

export default Group;