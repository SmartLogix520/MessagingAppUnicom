// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// function ChatTest() {

//     const [messageSent, setMessageSent] = useState(false);

//     const [chat, setChat] = useState([
//         {
//             user: "user 1",
//             message: "Le message"
//         },
//         {
//             user: "user 2",
//             message: "Le message 1"
//         },
//     ])
//     const getMessages = () => {
//         const instance = axios.create({
//             withCredentials: true
//         });

//         instance.get(`${process.env.REACT_APP_API_LINK}messages/`)
//             .then(function (res) {
//                 setChat(res.data)
//                 console.log(chat)
//             })
//             .catch(function (error) {
//                 console.log(error)
//             });
//     }

//     const sendMessage = () => {
//         // Envoyer le message à la base de donnée
//         setMessageSent(!messageSent)
//         console.log("Envoyer un nouveau message")
//         const instance = axios.create({
//             withCredentials: true
//         });

//         instance.post(`${process.env.REACT_APP_API_LINK}messages/send-message/`,
//             {
//                 sender_id: "contact_@company.com",
//                 receiver_id: "contact2@cc.com",
//                 content: "Message content 3",
//                 message_type: 0
//             }
//             )
//             .then(function (res) {
//                 console.log(res.data);
//             })
//             .catch(function (error) {
//                 console.log(error)
//             });
//     }
//     useEffect(() => {
//         getMessages()
//     }, [messageSent])

//     return (
//         <>
//             <div clasName="">
//                 <a onClick={() => sendMessage()}> Envoyer un message </a>
//                 <div>
//                    {chat?.map((i) => {
//                             return (
//                                 <p className='w-auto text-white bg-blue-400'>
//                                     <div>{i.sender_id} : {i.content}</div>
//                                 </p>
//                             );
//                         })}
//                 </div>
//             </div>
//         </>
//     )
// }
// export default ChatTest;