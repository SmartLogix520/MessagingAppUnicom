import React from 'react';
import 'remixicon/fonts/remixicon.css';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import image from '../images/image.png';
import Messenger from '../pages/Messenger.jsx';


const InfosUser = ({  }) => {
    return (
        <div className="contactInfo">
            <div className='contactInfoHaut'>
                <h3>Contact Information</h3>
            </div>
            <div className='info'>
                <img src={image} alt="" />
                <div className='User'>
                    <h4>{sessionStorage["username"]}</h4>
                </div>
                <div className='Email'>
                    <p>{sessionStorage["email"]}</p>
                </div>

                <div className='Name'>
                    <h4 className='first'> {sessionStorage["first_name"]}</h4>
                    <h4 className='last'> {sessionStorage["last_name"]}</h4>
                </div>
                
            </div>
            <div className='contactInfobas'>
                {/* Boutons pour bloquer ou supprimer */}
            </div>
        <style>
        

            {`

           
            h3{
                color:#395886;
                font-weight:bold;
                font-family: 'Roman', sans-serif;
                align-text:center;
                font-size:1.5vw;
                border-bottom: 1px solid #628ecb;
                margin-top:2vh;
                margin-left:1vw;
            }
            img{
                border-radius:50%;
                width: 8vw;
                height: auto;
                right:auto;
                left:auto;
            }
            .contactInfo {
                background-color:#D5DEEF !important;
                color: black;
                padding: 2vw;
                text-align: center;
                margin-right:3px;
                border-radius:20px;
                min-height:100vh;
                width:30%;
           }
         
            
            .contactInfo h4 {
                margin: 5px 0;
            }
            
            .contactInfobas {
                display: flex;
                justify-content: space-between;
                margin-top: 5px;
                /* Réduisez la marge supérieure */
                margin-left: 30px;
               
            }
            
          
            .Name{
                display:flex;
                font-size:14px;
                color:#395886;
            }
            .info {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top:5vh;
            }
            .Name .first{
                text-align: center;
               margin-right:3px;

            }
            
            .Num h4 {
                margin-left: 20px;
                margin-top: 1vh;
            }
            
            .User h4 {
                text-align: center;
                margin-top: 2vh;
                font-weight:bold;
                color:#395886;
                font-size:4vh;
            }
            .Email{
                font-size:14px;
                color:#395886;
            }
            
`
}
        </style>
        </div>
    );
};

export default InfosUser;