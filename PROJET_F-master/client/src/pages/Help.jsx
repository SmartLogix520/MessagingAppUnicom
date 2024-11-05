import React, { useState } from 'react';
// import './Help.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Help = () => {
    const [qaData, setQaData] = useState([
        {
            id: 1,
            question: "How to create a new account?",
            answer: "To create a new account, visit our registration page at [insert link here]. Once on this page, complete the registration form by providing the required information such as your email address, a unique username, and a secure password. Double-check the information you've provided and confirm your registration. In some cases, you may receive a verification email; simply follow the instructions in that email to confirm your account. Once this step is complete, log in using your new username and password.",
        },
        {
            id: 2,
            question: "I can't log in to my account. What should I do?",
            answer: " Make sure you've entered your username and password correctly. Also, check if the Caps Lock key is activated, as passwords are case-sensitive ,If you've forgotten your password, use the password reset option on the login page. You'll likely receive a reset link via email. Follow the instructions to create a new password Ensure you have a stable internet connection. Sometimes, a slow or unstable connection can prevent login. make sure you're using the latest version of your browser. Outdated versions can cause compatibility issues,Browser cookies or cache can sometimes cause login issues. Try clearing them and attempt to log in agai, Ensure your account hasn't been deactivated or restricted for any reason. Check your emails for any messages from customer support,If all else fails, contact our customer support. Provide as much information as possible, including your username and any relevant details, to receive prompt assistance..",
        },
        {
            id: 3,
            question: "How does automatic spam detection in messages work?",
            answer: "The application uses advanced algorithms to automatically detect unwanted messages and moves them to the spam folder.",
        },
        {
            id: 4,
            question: "How can I change my password?",
            answer: "If you wish to change your password and have a trusted email associated with your account, follow these steps for a secure update. Log in to your account using your current username and password, then navigate to the account settings, typically located in the top right corner of the page. Locate the 'Change Password' option and enter your current password for verification. Instead of directly entering a new password, choose the 'Forgot Password'  option. Follow the provided instructions, including sending a password reset link to your trusted email address. Access your email, open the reset link, and follow the steps to create a new password. Confirm the new password and save or update the changes.",
        },
        {
            id: 5,
            question: "how to edit profile?",
            answer: "Start by logging into your account using your username and password. Once logged in, look for a Profile option. This is  found in the top right corner of the page, under your profile name or icon  you should find an option to Edit Profile . Click on this option to proceed You will now be directed to a page where you can update various aspects of your profile. This may include your name, contact details, profile picture, and other relevant information,After making the desired changes, don't forget to save them. Look for a Save button at the bottom of the page.. It's advisable to check your profile afterward to ensure that the changes have been successfully updated.",
        },
        



    ]);

    
    const [visibleAnswers, setVisibleAnswers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleAnswerVisibility = (id) => {
        if (visibleAnswers.includes(id)) {
            setVisibleAnswers(visibleAnswers.filter((item) => item !== id));
        } else {
            setVisibleAnswers([...visibleAnswers, id]);
        }
    };

    const filteredQaData = qaData.filter(qa =>
        qa.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '200vh' }}>
                <Navbar onSearchChange={setSearchQuery} /> 
                <div style={{ flex: 1 }}>
                    <ul>
                        <li>
                            <input
                                className='Inpu'
                                type="text"
                                placeholder='What do you want to know... ?'
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </li>
                        <li></li>
                    </ul>
                    {filteredQaData.map((qa) => (
                        <div key={qa.id}>
                           <div className="qa-item">
                            <div className='qa-item1'>
                                <h2>{qa.question}</h2>
                                <button onClick={() => toggleAnswerVisibility(qa.id)}>
                                    {visibleAnswers.includes(qa.id) ? <svg xmlns="http://www.w3.org/2000/svg" className="plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>}
                                </button>
                            </div>
                        </div>
                        {visibleAnswers.includes(qa.id) && (
                            <div className="answer-container">
                                <p>{qa.answer}</p>
                            </div>
                        )}
                        </div>
                    ))}
                </div>
                <Footer />
                <style>
                    {`
                       
                        #root {
                            display: flex;
                            flex-direction: column;
                            min-height: 100vh;
                        }
    
                        body {
                            background-color: #F0F3FA;
                            margin: 0;
                            font-family: 'Arial', sans-serif;
                        }
    
                        .help-container {
                            margin: 0 auto;
                            width: 70vw;
                            padding: 20px;
                        }
    
                        .qa-item {
                            margin-bottom: 5vh;
                            margin-right: 2vw;
                            margin-left: 2vw;
                            /* border: 1px solid #B1C9EF; */
                            padding: 0.5px;
                            border-radius: 20px;
                            /* background-color: #B1C9EF; */
                          
                        }
                        
                        
                        
                        
                        .qa-item1 {
                            flex: 1;
                            border: 1.25px solid #628ecb;
                            border-radius: 20px;
                            padding: 0px 10px;
                            margin-left:50vh;
                            width: 50vw;
                        
                          transition: all 0.3s ease;  
                          
                         
                        }
                        
                        
                        /* 
                        .qa-item1 {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                        
                        } */
                        .qa-item ::placeholder{
                            font-size:14px;
                          color:#628ecb !important;
                          }
                          
                          .qa-item :hover {
                            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);  
                          } 
                        .qa-item1 h2 {
                            margin-left: 30px;
                        }
                        
                        
                        .qa-item1 {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                        }
                        
                        
                        button{
                            cursor: pointer;
                            
                        
                            margin-top: 30px;
                            border-radius: 20px;
                            margin-right: 10px;
                            color: #395886;
                            background-color:transparent !important;
                            border: none;
                            font-size: 30px;
                            padding: 2px; 
                            
                            transform: translateY(-30%);
                        }
                        
                        .answer-container {
                            background-color:white;
                            //margin-right: 2vw;
                            margin-left: 26vw;
                            padding: 9px;
                            margin-top: -2vh;
                            border-radius: 20px;
                            margin-bottom: 5vh;
                            border: 1.25px solid #628ecb;
                            width: 50vw;
                        }
                        
    
                        .Inpu {
                            min-width: 30vw;
                            margin-top: 50px;
                            margin-left: 35vw;
                            margin-bottom: 12vh;
                               padding: 8px 15px; 
                            width: 50%;
                            border-radius: 20px;
                          border-color: #628ECB;
                        }
                        
                    `}
                </style>
            </div>
        );
    };
    
    export default Help;