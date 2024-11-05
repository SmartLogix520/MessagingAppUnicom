// import React, { useState, useRef, useEffect } from 'react';
// import './Conversation.css';
// import 'remixicon/fonts/remixicon.css';
// import { Button } from '@mui/material';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import axios from "axios";
// import InfosUser from './InfosUser';
// import { FaFly, FaMicrophone, FaPaperPlane, FaTrash, FaFolder } from 'react-icons/fa';
// import socketIOClient from 'socket.io-client'


// const socket = socketIOClient("http://localhost:8000");

// const Conversation = ({ currentConversation, setIsFriendClicked, isFriendClicked }) => {
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState('');
//     const [recording, setRecording] = useState(false);
//     const [mediaRecorder, setMediaRecorder] = useState(null);
//     const conversationRef = useRef(null);
//     const [messageSent, setMessageSent] = useState(false);
//     const [showWindow, setShowWindow] = useState(false);
//     const [showWindowCreateGroup, setShowWindowCreateGroup] = useState(false);

//     const toggleWindow = () => {
//         setShowWindow(!showWindow);
//     };
//     const toggleWindowCreateGroup = () => {
//         setShowWindowCreateGroup(!showWindowCreateGroup);
//     };
    
    
//         // Vérifier si un ami a été cliqué

//         useEffect(() => {
//             if (isFriendClicked) {
//                 setIsFriendClicked(false);
//                 getMessages();
           
//             }    
//             socket.on('messageReceived', (newMessage) => {
//                 setMessages((prevMessages) => [...prevMessages, newMessage]);
//             });

//             return () => {
//                 socket.off('messageReceived');
//             };
        
//     }, [isFriendClicked]);
    
//     const getMessages = () => {
//         setIsFriendClicked(false);
//         const instance = axios.create({
//             withCredentials: true
//         });

//         const params = {
//             sender_id: localStorage["user_id"],
//             receiver_id: localStorage["msg_receiver"],
//             conversation_id: localStorage["conversation_id"],
//         }

//         instance.get(`${process.env.REACT_APP_API_LINK}messages/conversation`, { params: params})
//             .then(function (res) {
//                 setMessages(res.data);
//                 setIsFriendClicked(true);
               
//             })
//             .catch(function (error) {
//                 console.log(error)
//             });
//     }

//     const handleSendMessage = () => {
//         // Envoyer le message à la base de donnée
//         if (inputMessage.trim() !== '') {
//             setMessageSent(!messageSent)

//             const instance = axios.create({
//                 withCredentials: true
//             });

//             instance.post(`${process.env.REACT_APP_API_LINK}messages/send-message/`,
//                 {
//                     sender_id: localStorage["user_id"],
//                     receiver_id: localStorage["user_id"],
//                     conversation_id: localStorage["conversation_id"],
//                     content: inputMessage,
//                     message_type: 0
//                 }
//             )
//                 .then(function (res) {
//                     console.log(res.data);
//                     setMessages([...messages, res.data]);
//                     setInputMessage('');
//                     socket.emit('new-message', { conversationId: localStorage["conversation_id"], message: res.data });
//                 })
//                 .catch(function (error) {
//                     console.log(error)
//                 });
//         }
//     };
//     useEffect(() => {
//         socket.on('new-message', (data) => {
//             // Traitez le nouveau message ici
//             console.log('Nouveau message reçu via socket:', data);
//             // Mettez à jour l'état des messages avec le nouveau message, si nécessaire
//         });

//         // Nettoyez les écouteurs d'événements lorsque le composant est démonté
//         return () => {
//             socket.off('new-message');
//         };
//     }, []);


//     // const createGroup = (groupName, members) => {
//     //     console.log("je suis ici")
//     //     // Implement the logic to create a group here
    
//     //     // Make a request to your backend API to create the group
//     //     const instance = axios.create({
//     //       withCredentials: true,
//     //     });
//     //     console.log(groupName)
    
//     //     instance.post(`${process.env.REACT_APP_API_LINK}messages/create-group`, {
//     //       groupName,
//     //       members,
//     //     })
//     //       .then(function (res) {
//     //         console.log(res.data);
//     //         // Handle the response or update the UI as needed
//     //       })
//     //       .catch(function (error) {
//     //         console.log(error);
//     //         // Handle the error
//     //       });
//     //   };

//     const handleMessageDeletion = (messageId) => {
//         const instance = axios.create({
//             withCredentials: true
//         });

//         alert(messageId)
//         const params = {
//             id : messageId
//         }

//         instance.delete(`${process.env.REACT_APP_API_LINK}messages/delete-message/${messageId}`)
//             .then(function (res) {
//                 console.log(res.data)
//             })
//             .catch(function (error) {
//                 console.log(error)
//             });
//     };

//     const enterPressed = (e) => {
//         e.preventDefault()
//         if (e.keyCode === 13)
//             if (inputMessage.trim() !== '') {
//                 const newMessage = {
//                     text: inputMessage,
//                     sender: 'user',
//                     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//                 };
//                 setMessages([...messages, newMessage]);
//                 setInputMessage('');
//             }
//     };

//     const fileInputRefAttach = useRef(null);
//     const fileInputRefPhoto = useRef(null);

//     const handleAttachFile = () => {
//         if (fileInputRefAttach.current) {
//             // Déclenche l'ouverture de la boîte de dialogue de sélection de fichier
//             fileInputRefAttach.current.click();
//         }
//     };

//     const handleInsertPhoto = () => {
//         if (fileInputRefPhoto.current) {
//             // Déclenche l'ouverture de la boîte de dialogue de sélection de fichier
//             fileInputRefPhoto.current.click();
//         }
//     };

//     const handleFileInputChange = (event) => {
//         const selectedFile = event.target.files[0];

//         if (selectedFile) {
//             const formData = new FormData();
//             formData.append('file', selectedFile);

//             // Vous pouvez maintenant envoyer formData avec votre requête pour télécharger le fichier sur le serveur

//             // Afficher une miniature de l'image dans la zone de texte
//             const imageUrl = URL.createObjectURL(selectedFile);

//         }
//     };


//     //pour rendre visible les infos en cliquant sur Username
//     const [detailsVisible, setDetailsVisible] = useState(false);
//     const handleToggleDetails = () => {
//         setDetailsVisible(!detailsVisible);
//     };

//     //la function pour que quand je clique sur entree le message sera envoyer
//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     //la function pour quand je clique sur button emojis une liste d'emojis qui v'ont afficher
//     const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
//     const toggleEmojiPicker = () => {
//         setEmojiPickerVisible(!emojiPickerVisible);
//     };
//     const handleEmojiClick = (emoji) => {
//         setInputMessage((prevMessage) => prevMessage + emoji);
//     };


//     return (
//         <div className="w-3/4 border-l-gray-900">
//             <div className="w-full">
//                 <div className="header bg-white p-2" >
//                     <div onClick={handleToggleDetails} style={{ cursor: 'pointer' }}>
//                         <img className="chat-img rounded-md" width={50} height={50} src={currentConversation?.image} alt="" />
//                         <h2 className="font-bold mt-5 mb-0">{currentConversation?.name || ''}</h2>
//                         <h6 className="text-xs text-green-500 mt-0" style={{ cursor: 'pointer' }}>       Online  </h6>
//                     </div>

//                     <div className='navbarmessage'>
//                     <Button onClick={toggleWindowCreateGroup}>Créer un groupe</Button>

//                         {showWindowCreateGroup && (
//                         <div className="fenetre">
//                             <div className="friends-list">
//                             {/* Interface pour créer un groupe et ajouter des membres */}
//                             <input type="text" placeholder="Nom du groupe" className="search-input" />
//                             <input type="text" placeholder="Ajouter des membres (séparés par des virgules)" className="search-input" />
//                             <button>Créer le groupe</button>
//                             <button onClick={toggleWindowCreateGroup}>Fermer</button>
//                             </div>
//                         </div>
//                         )}
//                         <Button>
//                             <i className="ri-video-add-line"></i>
//                         </Button>
//                         <Button>
//                             <i className="ri-phone-fill"></i>
//                         </Button>
//                         <Button>
//                             <i className="ri-search-line"></i>
//                         </Button>
//                         <Button>
//                             <i className="ri-settings-5-line"></i>
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="Ajouter-amis">
//                 {showWindow && (
//                     <div className="fenetre">
//                         <div className="friends-list">
//                             <div className='freind-liste-fils'>
//                                 <input type="text" placeholder="Rechercher un ami" className="search-input" />
//                                 <button className='fermer' onClick={toggleWindow}>X</button>
//                                 <button onClick={toggleWindow}>Ajouter</button>
//                             </div>

                          
//                         </div>
//                     </div>
//                 )}
//             </div>
//                 <div className="chat-container bg-white">
//                     {/* ... Other elements ... */}
//                     <div className="conversation" ref={conversationRef}>
//                         {messages && messages.map((msg, index) => (
//                             <>
//                             <div
//                                 key={index}
//                                 className={`message ${msg.sender_id !== localStorage["user_id"] ? 'sent bg-green-500 text-white' : 'received bg-blue-500 text-white'}`}
//                             >
//                                 <p>
//                                     {msg.sender_id == localStorage["email"] && (
//                                         <a onClick={() => handleMessageDeletion(msg._id)}><FaTrash></FaTrash></a>
//                                     )}
//                                     { msg.content }
//                                 </p>
                                
//                             </div>
//                             <div className="text-center"><span className='text-dark text-xs'>{msg.sending_date}</span></div>
//                             </>
//                         ))}
//                     </div>
//                     <div className="input-area p-3 bg-white">
//                         <span className='fichier bg-slate-100 p-2 rounded-full mr-2'><FaMicrophone></FaMicrophone>  </span>
//                         <input
//                             type="text"
//                             className="text-black border-none bg-gray-100 rounded-3xl"
//                             value={inputMessage}
//                             placeholder="Write a Message..."
//                             onChange={(e) => setInputMessage(e.target.value)}
//                             onKeyUp={(e) => enterPressed(e)}
//                             onKeyDown={handleKeyDown}
//                         />
            
//                             <a className="bg-gray-200 p-2 rounded-full mr-2" onClick={handleSendMessage}>
//                                 <span class="text-black rounded-3xl border-none"><FaPaperPlane></FaPaperPlane></span>
//                             </a>
    


//                         <label htmlFor="">
//                             <input
//                                 id="file-input-attach"
//                                 type="file"
//                                 style={{ display: 'none' }}
//                                 onChange={handleFileInputChange}
//                                 ref={fileInputRefAttach}
//                             />
//                             <span className="" aria-label="Attach File" onClick={handleAttachFile}>
//                                 <i className=""><FaFolder></FaFolder></i>
//                             </span>
//                         </label>


                      

//                         <span className='fichier' onClick={toggleEmojiPicker}><i className="ri-emotion-line"></i></span>
//                         {emojiPickerVisible && (
//                             <div className="emoji-picker">
//                                 <span onClick={() => handleEmojiClick("😊")} role="img" aria-label="Smile">😊</span>
//                                 <span onClick={() => handleEmojiClick("❤️")} role="img" aria-label="Heart">❤️</span>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//             </div>

//             {
//                 detailsVisible && (
//                     <InfosUser />
//                 )
//             }
//         </div >
//     );
// };

// export default Conversation;

import React, { useState, useRef, useEffect } from 'react';
// import './Conversation.css';
import 'remixicon/fonts/remixicon.css';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from "axios";
import InfosUser from './InfosUser';
import { FaFly, FaMicrophone, FaPaperPlane, FaTrash, FaFolder } from 'react-icons/fa';
import socketIOClient from 'socket.io-client';
import AudioRecorder from './AudioRecorder';
import { v1 as uuid } from "uuid";

const socket = socketIOClient("http://localhost:8000");

const Conversation = ({ currentConversation, setIsFriendClicked, isFriendClicked }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const conversationRef = useRef(null);
    const [messageSent, setMessageSent] = useState(false);
    const [showWindow, setShowWindow] = useState(false);
    const [showWindowCreateGroup, setShowWindowCreateGroup] = useState(false);

    useEffect(() => {
        if (isFriendClicked) {
          setIsFriendClicked(false);
          setLoading(true);
          getMessages();
        }
      }, [isFriendClicked]);
    
      useEffect(() => {
        if (loading) {
          setLoading(false);
          scrollToBottom();  // Scroll to the bottom when messages are loaded
        }
      }, [messages]);
      useEffect(() => {
        // Scroll to the bottom when new messages are added
        scrollToBottom();
      }, [messages.length]);
    
      const scrollToBottom = () => {
        if (conversationRef.current) {
          conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
      };
    
    const [loading, setLoading] = useState(false);
    const startVideoCall = () => {
        const id = uuid();
        initiateVideoCall(id)
     
    }

    const initiateVideoCall = async (id) => {
		const instance = axios.create({
			withCredentials: true
		});

		instance.post(`${process.env.REACT_APP_API_LINK}calls/initiate-call/`,
			{
				caller_id: localStorage["user_id"],
				receiver_id: localStorage["msg_receiver"],
				socket: id
			}) 
			.then(function (res) {
               // window.location.href = `/start-video-call/${id}`;
			})
			.catch(function (error) {
				console.log(error)
			});
	}

    const toggleWindow = () => {
        setShowWindow(!showWindow);
    };
    const toggleWindowCreateGroup = () => {
        setShowWindowCreateGroup(!showWindowCreateGroup);
    };
    
    
        // Vérifier si un ami a été cliqué

        useEffect(() => {
            if (isFriendClicked) {
                setIsFriendClicked(false);
                setLoading(true);
                getMessages();
        
            }    
        
    }, [isFriendClicked]);
    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
    }, [messages]);
    
    const getMessages = () => {
        setIsFriendClicked(false);
        const instance = axios.create({
            withCredentials: true
        });

        const params = {
            sender_id: localStorage["user_id"],
            receiver_id: localStorage["msg_receiver"],
            conversation_id: localStorage["conversation_id"],
        }
        console.log(localStorage["conversation_id"])

        instance.get(`${process.env.REACT_APP_API_LINK}messages/conversation`, { params: params})
            .then(function (res) {
                setMessages(res.data);
                setIsFriendClicked(true);
               
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const handleSendMessage = () => {
        // Envoyer le message à la base de donnée
        if (inputMessage.trim() !== '') {
            setMessageSent(!messageSent)

            const instance = axios.create({
                withCredentials: true
            });

            instance.post(`${process.env.REACT_APP_API_LINK}messages/send-message/`,
                {
                    sender_id: localStorage["user_id"],
                    receiver_id: localStorage["user_id"],
                    conversation_id: localStorage["conversation_id"],
                    content: inputMessage,
                    message_type: 0
                }
            )
                .then(function (res) {
                    console.log(res.data);
                    setMessages([...messages, res.data]);
                    setInputMessage('');
                    socket.emit('new-message', { conversationId: localStorage["conversation_id"], message: res.data });
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    };
 
    // const createGroup = (groupName, members) => {
    //     console.log("Si tu me cherches, je suis plus la")
    //     // Implement the logic to create a group here
    
    //     // Make a request to your backend API to create the group
    //     const instance = axios.create({
    //       withCredentials: true,
    //     });
    //     console.log(groupName)
    
    //     instance.post(`${process.env.REACT_APP_API_LINK}messages/create-group`, {
    //       groupName,
    //       members,
    //     })
    //       .then(function (res) {
    //         console.log(res.data);
    //         // Handle the response or update the UI as needed
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //         // Handle the error
    //       });
    //   };

    const handleMessageDeletion = (messageId) => {
        const instance = axios.create({
            withCredentials: true
        });

        alert(messageId)
        const params = {
            id : messageId
        }

        instance.delete(`${process.env.REACT_APP_API_LINK}messages/delete-message/${messageId}`)
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error)
            });
    };
    // cette fonction verifie le local dsrorqge 

    const enterPressed = (e) => {
        e.preventDefault()
        if (e.keyCode === 13)
            if (inputMessage.trim() !== '') {
                const newMessage = {
                    text: inputMessage,
                    sender: 'user',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages([...messages, newMessage]);
                setInputMessage('');
            }
    };

    const fileInputRefAttach = useRef(null);
    const fileInputRefPhoto = useRef(null);

    const handleAttachFile = () => {
        if (fileInputRefAttach.current) {
            // Déclenche l'ouverture de la boîte de dialogue de sélection de fichier
            fileInputRefAttach.current.click();
        }
    };

    const handleInsertPhoto = () => {
        if (fileInputRefPhoto.current) {
            // Déclenche l'ouverture de la boîte de dialogue de sélection de fichier
            fileInputRefPhoto.current.click();
        }
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Vous pouvez maintenant envoyer formData avec votre requête pour télécharger le fichier sur le serveur

            // Afficher une miniature de l'image dans la zone de texte
            const imageUrl = URL.createObjectURL(selectedFile);

        }
    };


    //pour rendre visible les infos en cliquant sur Username
    const [detailsVisible, setDetailsVisible] = useState(false);
    const handleToggleDetails = () => {
        setDetailsVisible(!detailsVisible);
    };

    //la function pour que quand je clique sur entree le message sera envoyer
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    //la function pour quand je clique sur button emojis une liste d'emojis qui v'ont afficher
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
    };
    const handleEmojiClick = (emoji) => {
        setInputMessage((prevMessage) => prevMessage + emoji);
    };
    console.log("conversationId", localStorage.getItem("conversationId"));
    console.log("currentConversation", currentConversation);


    return (
        <div className="mainPere">
            <div className="main-content">
                
            {localStorage.getItem("conversationId") ? (
                
                <div className="header-options" >
                   <div className='userInfo' onClick={handleToggleDetails} style={{ cursor: 'pointer' }}>
                <img id='uimage' className="chat-img rounded-md" width={50} height={50} src={currentConversation?.image} alt="" />
                <h2 id='uname' className="font-bold mt-5 mb-0">{currentConversation?.name || ''}</h2>
                        {/* <h6 className="text-xs text-green-500 mt-0" style={{ cursor: 'pointer' }}>       Online  </h6> */}
                    </div>

                    
                    <div className='navbarmessage'>
                   
                  
                         <Button onClick={startVideoCall}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-video-plus" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                                    <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                                    <path d="M7 12l4 0" />
                                    <path d="M9 10l0 4" />
                                    </svg>
                        </Button>
                      
                        
                    </div>
                </div>
                ) : null}
                {/* ) : (
                    <div className="default-message">
                      <img src='conversation.svg' alt="Conversation" />
                      <p>Let's get chatting! Start a new conversation with your friends.</p>
                    </div>
                    } */}
                
              

         
                <div className="Ajouter-amis">
                {showWindow && (
                    <div className="fenetre">
                        <div className="friends-list">
                            <div className='freind-liste-fils'>
                                <input type="text" placeholder="Search a friend" className="search-input" />
                                <button className='fermer' onClick={toggleWindow}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg></button>
                                <button onClick={toggleWindow}>Add</button>
                            </div>

                          
                        </div>
                    </div>
                )}
            </div>
                <div className="chat-container bg-white">
                {localStorage.getItem("conversation_id") ? (
                    <>
                    {/* ... Other elements ... */}
                    {currentConversation ? (
                    <div className="conversation" ref={conversationRef}>
                        
                    {messages && messages.map((msg, index) => (
                        <>
                            {/* Affichez directement le message en texte si c'est un message texte */}
                            {msg.message_type === 0 && (
                                <div
                                    key={index}
                                    className={`message ${msg.sender_id !== localStorage["user_id"] ? 'sent bg-green-500 text-white' : 'received bg-blue-500 text-white'}`}
                                >
                                    <p>
                                        {msg.sender_id === localStorage["email"] && (
                                            <a onClick={() => handleMessageDeletion(msg._id)}><FaTrash></FaTrash></a>
                                        )}
                                        {msg.content}
                                    </p>
                                </div>
                            )}

                            {/* Affichez directement le message en audio si c'est un message audio */}
                            {msg.message_type === 1 && (
                                <div
                                    key={index}
                                    className={`message ${msg.sender_id !== localStorage["user_id"] ? 'sent bg-green-500 text-white' : 'received bg-blue-500 text-white'}`}
                                >
                                    <audio src={"http://localhost:5000/uploads/" + msg.content} controls />
                                </div>
                            )}

                            <div className="text-center"><span className='text-dark text-xs'>{msg.sending_date}</span></div>
                        </>
                    ))}
                  </div>
                  ) : (
          <div className="default-message">
            <img src='conversation.svg' alt="Conversation" />
            <p>Let's get chatting! Start a new conversation with your friends.</p>
          </div>
          
        )}
         </>
        ) : (
            <div className="default-message">
              <img src='conversation.svg' alt="Conversation" />
              <p>Let's get chatting! Start a new conversation with your friends.</p>
            </div>
          )}

                
               
                {currentConversation && (
                    <div className="input-area p-3 bg-white">
                        <span className='fichier bg-slate-100 p-2 rounded-full mr-2'>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-microphone" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M8 21l8 0" /><path d="M12 17l0 4" /></svg> 
                          */}
                           <AudioRecorder></AudioRecorder>
                             </span>
                        <textarea
                            type="text"
                            className="text-black border-none bg-gray-100 rounded-3xl"
                            value={inputMessage}
                            placeholder="Write a Message..."
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyUp={(e) => enterPressed(e)}
                            onKeyDown={handleKeyDown}
                        />
            
                            <a className="send-button" onClick={handleSendMessage}>
                                <span class="text-black rounded-3xl border-none"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg></span>
                            </a>


                        <label htmlFor="">
                            <input
                                id="file-input-attach"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                                ref={fileInputRefAttach}
                            />
                           <span className="" aria-label="Attach File" onClick={handleAttachFile}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>
                            </span>
                        </label>


                      

                        <span className='fichier' onClick={toggleEmojiPicker}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mood-smile" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 10l.01 0" />
                            <path d="M15 10l.01 0" />
                            <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
                            </svg></span>
                        {emojiPickerVisible && (
                            <div className="emoji-picker">
                                  <span onClick={() => handleEmojiClick("😊")} role="img" aria-label="Smile">😊</span>
                                <span onClick={() => handleEmojiClick("❤️")} role="img" aria-label="Heart">❤️</span>
                                <span onClick={() => handleEmojiClick("😍")} role="img" aria-label="Heart">😍</span>
                                <span onClick={() => handleEmojiClick("🤩")} role="img" aria-label="Heart">🤩</span>
                                <span onClick={() => handleEmojiClick("🥰")} role="img" aria-label="Heart">🥰</span>
                                <span onClick={() => handleEmojiClick("😀")} role="img" aria-label="Heart">😀</span>
                                <span onClick={() => handleEmojiClick("😄")} role="img" aria-label="Heart">😄</span>
                                <span onClick={() => handleEmojiClick("😁")} role="img" aria-label="Heart">😁</span>
                                <span onClick={() => handleEmojiClick("🙂")} role="img" aria-label="Heart">🙂</span>
                                <span onClick={() => handleEmojiClick("😅")} role="img" aria-label="Heart">😅</span>
                                <span onClick={() => handleEmojiClick("😉")} role="img" aria-label="Heart">😉</span>
                                <span onClick={() => handleEmojiClick("🌍")} role="img" aria-label="Heart">🌍</span>
                                <span onClick={() => handleEmojiClick("😎")} role="img" aria-label="Heart">😎</span>
                                <span onClick={() => handleEmojiClick("🧡")} role="img" aria-label="Heart">🧡</span>
                                <span onClick={() => handleEmojiClick("💙")} role="img" aria-label="Heart">💙</span>
                                <span onClick={() => handleEmojiClick("😴")} role="img" aria-label="Heart">😴</span>
                                <span onClick={() => handleEmojiClick("🙃")} role="img" aria-label="Heart">🙃</span>
                                <span onClick={() => handleEmojiClick("🤣")} role="img" aria-label="Heart">🤣</span>
                                <span onClick={() => handleEmojiClick("😂")} role="img" aria-label="Heart">😂</span>
                                <span onClick={() => handleEmojiClick("😇")} role="img" aria-label="Heart">😇</span>
                                <span onClick={() => handleEmojiClick("😑")} role="img" aria-label="Heart">😑</span>
                                <span onClick={() => handleEmojiClick("🤨")} role="img" aria-label="Heart">🤨</span>
                                <span onClick={() => handleEmojiClick("😔")} role="img" aria-label="Heart">😔</span>
                                 <span onClick={() => handleEmojiClick("😟")} role="img" aria-label="Heart">😟</span>
                                 <span onClick={() => handleEmojiClick("☹️")} role="img" aria-label="Heart">☹️</span>
                                 <span onClick={() => handleEmojiClick("😒")} role="img" aria-label="Heart">😒</span>
                                 <span onClick={() => handleEmojiClick("😥")} role="img" aria-label="Heart">😥</span>

                            </div>
                        )}
                    </div>
                      )}
                      
                      
                </div>
                
                
</div>


{
    detailsVisible && (
      <InfosUser />
    )
  }
  
 <style>
 {`
.mainPere {
    display: flex;
    flex-direction: row;
    top: 0;
    background-color: white;
    padding:0;
    margin:0;
    width:75;
}

.main-content {
    flex: 1;
    border-left: 1px solid #ddd;
    width: 50vw;
    height: 100vh;
    margin-bottom: 3vh;
    overflow: hidden;
    top:0;

}

.header-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    top:0;
}

.userInfo{
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding-left:2vw;
}

.navbarmessage {
    display: flex;
}

.header button,
.button,
.writemsg send-button {
    font-size: 1.3rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.header button:hover,
.button:hover,
.writemsg send-button:hover {
    background-color: rgba(128, 128, 128, 0.452);
}

.conversation {
    height: 60vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
}
.input-area svg{
    color:#395886 !important;
}
.message {
    position: relative;
    padding: 8px 14px;
    border-radius: 15px;
    margin-bottom: 10px;
    word-wrap: break-word;
    display: inline-block;
    transition: background-color 0.3s ease;
}

.sent {
    align-self: flex-start;
    color: white;
    max-width: 70%;
    background-color:#8aaee0 !important;
    border-radius:20px !important;
}

.received {
    align-self: flex-end;
    color: white;
    max-width: 70%;
    background-color:#395886 !important;
    border-radius:20px !important;
}
#uimage{
   border-radius:50%;
}
#uname{
 margin-left:5px;
 top:auto;
 bottom:auto;

}
.time {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 10px;
    margin-bottom: 5px;
    color: #b1c9ef;
}

.input-area {
    display: flex;
    align-items: center;
    margin-top: 2vh;
    border-top: 2px solid transparent;
    padding-top: 3vh;
    background-color: #fff;
    padding-bottom:3vh;
    bottom:0;
    z-index:2222;
}

input,
.text-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 10px;
    transition: box-shadow 0.3s ease;
}

input:focus,
.text-input:focus {
    box-shadow: 0 0 5px 2px #bbb;
}
textarea {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 10px;
    transition: box-shadow 0.3s ease;
}

.file-button,
.photo-button {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    margin-right: 10px;
}

.file-button .icon,
.photo-button .icon {
    display: inline-block;
    font-size: 20px;
    margin-top: 3px;
}

.button,
.writemsg send-button {
    padding: 10px 20px;
    border-radius: 15px;
    cursor: pointer;
}

.button-icon {
    font-size: 18px;
    margin-right: 5px;
}

.fichier {
    font-size: 1.8rem;
    margin-left: 0.5vw;
}

.contactInfo {
    color: black;
    padding: 10px;
    text-align: center;
    width: 18vw;
    overflow-y: auto;
}

.emoji-picker {
    margin-bottom: 8vh;
    border: #333 1px solid;
    
}

.emoji-picker span {
    cursor: pointer;
}

.image-thumbnail {
    max-width: 100px;
    max-height: 100px;
    cursor: pointer;
}

.chat-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.header-options {
    background-color: #D5DEEF;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5vw 0.3vh;
    top: 0;
}

.writemsg {
    position: relative;
    display: flex;
    bottom: 0;
    margin-top: 0;
    justify-content: space-between;
    align-items: center;
}

.writemsg svg {
    color: #395886;
    padding: 0;
    background-color: transparent;
}

.writemsg send-button {
    background-color: #395886;
    color: white;
}

.text-input::placeholder {
    color: #628ecb;
    font-size: 14px;
}   
.default-message img{
    width:50vw;
    height:50vh;
    margin-right:auto;
    margin-left:auto;
    margin-top:10vh;
}
.default-message p{
    color:#395886;
    font-weight:bold;
    margin-right:auto;
    margin-left:auto;
   font-size:20px;
}

               `}
            </style>
        </div >
    );
};

export default Conversation;