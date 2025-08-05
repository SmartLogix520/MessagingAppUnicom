import React from "react";
import logo from "../ReplyPal.svg";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import DropDownMenu from '../components/DropDownMenu'

import {
    FaEnvelope,
    FaMailBulk,
    FaArrowCircleRight,
    FaTrash,
    FaComments,
    FaAddressBook,
    FaPlus,
    FaSave,
    FaUser,
    FaUserAlt
} from "react-icons/fa";

import { IconContext } from "react-icons";

function ProfileMenu() {
    if (!localStorage["email"]) return ("Unauthorized")
    return (
        <div class="side">
            
            <ul class="options">
            <a href="/Profile">
            <li class="option0">
                   
                        <span class="text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="27" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
</svg><span>Home Profil</span>
                        </span>
                   
                </li>
                </a>
                <a href="/profile/update-profile">
                <li class="option0">
                    
                    <span class="text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="27" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                     <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                     <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                     <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                     </svg> 
                         <span> Personal Information</span>
                    </span>  
                    
                </li>
                </a>
                {/* <li class="relative px-6 py-2">
                    <a href="/drafts">
                        <span class="text-gray-800">
                            <FaSave className="float-left mx-2" /> Drafts
                        </span>
                    </a>
                </li> */}
                <a href="/profile/update-password">
                <li class="option0">
                    
                        <span class="text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock-square-rounded" width="27" height="26" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                        <path d="M8 11m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
                        <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
                            </svg> <span> Security</span>
                        </span>
                    
                </li>
                </a>
                {/* <a href="/Spams">
                <li class="option0">
                    
                    <span class="text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M12 9h.01" />
                        <path d="M11 12h1v4h1" />
                        </svg> <span>Spams</span>
                    </span>
                    
                </li>
                </a> */}
                {/* <li class="relative px-6 py-2">
                    <span class="text-gray-800">
                        <FaMailBulk className="float-left mx-2 " /> Spams
                    </span>
                </li> */}
{/*                 
                <li class="relative px-6 py-2">
                <a href="/Trash">
                    <span class="text-gray-800 text-small">
                        <FaTrash className="float-left mx-2 font-bold" /> Trash
                    </span>
                </a>
                </li> */}
                {/* <a href="/Trash">
                <li class="option0">
                    
                    <span class="text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg> <span>Trash</span>
                    </span>
                      
                </li>
                </a> */}
            </ul>
            <hr className="mt-4" />

            <style>
      
        {`
    body{
        background-image: none;
      }
        .side{
          background-color: #f0f3fa;
          border-radius:20px;
          padding: 10px;
          width: 220px;
          position: fixed;
          top:8.7vh;
          left:5vw;
          display: flex;
          flex-direction: column;
          align-items: left;
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh; 
          margin-bottom:4px;
          border:none;
          position:fixed;
          font-size:15px;
          // margin-top: 30px;
        }
        
        .options {
          display: flex;
          flex-direction: column;
          margin-top: 25%;
          align-items:left;
          border:none;
          background-color: #f0f3fa;
          padding: 0rem;
        }
        
        .option0 {
          margin-bottom: 5px;
          cursor: pointer;
          display:flex;
          align-items:left;
          padding-top:8px;
          padding-bottom:8px;
          padding-right:0vw;
          padding-left:0vw;
          width:100%;
          border-radius:20px;
          border:none;
          background-color:#abcbff;
        }
        .option0 span {
            color: black;
            margin-left: px;
            margin-right: px;
        }
        
        .option1{
          background-color:#395886;
          border-radius:20px;
          color:white;
          display:flex; 
          align-items:center; 
          margin-top:5px;
          height:6vh;
          padding:10px;
        }
        .option1:hover{
          opacity:0.7;
        }
        .option1 svg{
          margin-right:8px;
        }
        
        
        .option0:hover {
          background-color: #D5DEEF;
        }
        .option0:active{
          background-color:#395886 ;
        }
        .option0:active span {
          color:white;
        }
       .option0:active svg {
          color:white;
        }
        
        .option0 svg {
          margin-right: 5px; 
          padding:0;

        }
        
        .option0 span {
          color:black;
          margin-left:8px;
        }
        .text-gray-800{
          display:inline-flex;
          align-items:center;
        }
        `}
      </style>
        </div>
    );
}

export default ProfileMenu;

// import React from "react";
// import logo from "../ReplyPal.svg";
// import { Outlet, Link } from "react-router-dom";
// import axios from 'axios';
// import DropDownMenu from '../components/DropDownMenu'



// import { IconContext } from "react-icons";

// function EmailMenu() {
//     if (!localStorage["email"]) return ("Unauthorized")
//     return (
//         <div class="side">
//             <a href="/compose" className="option1">
//                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                 <path d="M12 5l0 14" />
//                 <path d="M5 12l14 0" />
//                 </svg> <span>New message </span>  
//             </a>
//             <ul class="options">
//                 <li class="option0">
//                     <a href="/inbox">
//                         <span class="text-gray-800">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                             <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
//                             <path d="M3 7l9 6l9 -6" />
//                             </svg> <span>Inbox</span>
//                         </span>
//                     </a>
//                 </li>
//                 <li class="option0">
//                     <a href="/sent">
//                     <span class="text-gray-800">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-forward" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                           <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                           <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
//                           <path d="M3 6l9 6l9 -6" />
//                           <path d="M15 18h6" />
//                           <path d="M18 15l3 3l-3 3" />
//                         </svg> <span>Sent</span>
//                     </span>  
//                     </a>
//                 </li>
//                 <li class="option0">
//                     <a href="/drafts">
//                         <span class="text-gray-800">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                             <path d="M14 3v4a1 1 0 0 0 1 1h4" />
//                             <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
//                             </svg> <span>Drafts</span>
//                         </span>
//                     </a>
//                 </li>
//                 <li class="option0">
//                     <span class="text-gray-800">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                         <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
//                         <path d="M12 9h.01" />
//                         <path d="M11 12h1v4h1" />
//                         </svg> <span>Spams</span>
//                     </span>
//                 </li>
//                 <li class="option0">
//                     <span class="text-gray-800">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                         <path d="M4 7l16 0" />
//                         <path d="M10 11l0 6" />
//                         <path d="M14 11l0 6" />
//                         <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
//                         <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
//                         </svg> <span>Trash</span>
//                     </span>
//                 </li>
//             </ul>
//             <hr className="mt-4" />
//         <style>
      
//         {`
//     body{
//         background-image: none;
//       }
//         .side{
//           background-color: #f0f3fa;
//         //   background-color: #6181b7;
//           border-radius:20px;
//           padding: 10px;
//           width: 220px;
//           position: fixed;
//           top:8.7vh;
//           left:5vw;
//           display: flex;
//           flex-direction: column;
//           align-items: left;
//           font-family: Arial, Helvetica, sans-serif;
//           min-height: 100vh; 
//           margin-bottom:4px;
//           border:none;
//           position:fixed;
//           font-size:15px;
//         }
        
//         .options {
//           display: flex;
//           flex-direction: column;
//           margin-top: 25%;
//           align-items:left;
//           border:none;
//            background-color: #f0f3fa;
//         }
        
//         .option0 {
//           margin-bottom: 5px;
//           cursor: pointer;
//           display:flex;
//           align-items:left;
//           padding-top:8px;
//           padding-bottom:8px;
//           padding-right:3vw;
//           padding-left:1vw;
//           width:100%;
//           border-radius:20px;
//           border:none;
//         }
        
//         .option1{
//           background-color:#395886;
//           border-radius:20px;
//           color:white;
//           display:flex; 
//           align-items:center; 
//           margin-top:5px;
//           height:6vh;
//           padding:10px;
//         }
//         .option1:hover{
//           opacity:0.7;
//         }
//         .option1 svg{
//           margin-right:8px;
//         }
        
        
//         .option0:hover {
//           background-color: #D5DEEF;
//         }
//         .option0:active{
//           background-color:#395886 ;
//         }
//         .option0:active span {
//           color:white;
//         }
//        .option0:active svg {
//           color:white;
//         }
        
//         .option0 svg {
//           margin-right: 5px; 
//           padding:0;

//         }
        
//         .option0 span {
//           color:black;
//           margin-left:8px;
//         }
//         .text-gray-800{
//           display:inline-flex;
//           align-items:center;
//         }
//         `}
//       </style>
//     </div>
//   );
// }


// export default EmailMenu;