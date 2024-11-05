import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from 'react-toastify'; /////////// a ajouter  dans le package.json :  "react-toastify": "^4.0.3
function Compose() {
    const [formData, setFormData] = useState({
        cc: '',
        email_receiver: [], // Changez ici
        email_sender: '',
        date: '',
        subject: '',
        content: '',
        file: null,
    });
    const [encryptedContent, setEncryptedContent] = useState('27e9e76101727d351ec7f26cf0cbf3767872958144f5cefbddd0170fd591046b');
    const [decriptionKey, setDecriptionKey] = useState('27e9e76101727d351ec7f26cf0cbf3767872958144f5cefbddd0170fd591046b');

    const [formErrors, setFormErrors] = useState({});

    const onFormChange = (e) => {
        const { name, value } = e.target;

        if (name === "email_receiver") {
            const emailArray = value.split(",").map((email) => email.trim());
            setFormData({
                ...formData,
                [name]: emailArray,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateEmail = (email) => {
        const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return String(email)
            .toLowerCase()
            .match(regExp);
    };

    const validateForm = () => {
        const errors = {};
    
        if (!formData.email_receiver || formData.email_receiver.length === 0) {
            errors.email_receiver = "Destination email required";
        } else {
            for (const email of formData.email_receiver) {
                if (!validateEmail(email.trim())) {
                    errors.email_receiver = "Une ou plusieurs adresses e-mail sont incorrectes";
                    break;
                }
            }
            if (!formData.email_receiver[0].trim().endsWith("@uni.com")) {
                errors.email_receiver = "Destination email must end with '@uni.com'";
            }
        }
    
        if (formData.cc.trim() && !validateEmail(formData.cc.trim())) {
            errors.cc = "cc email incorrect";
        }
    
        if (!formData.subject.trim()) {
            errors.subject = "Subject required";
        } else if (formData.subject.trim().length < 3) {
            errors.subject = "Subject too short";
        }
    
        if (!formData.content.trim()) {
            errors.content = "Content is empty";
        } else if (formData.content.trim().length < 3) {
            errors.content = "Content is too short";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };
    const dataEncrypt = (text) => {
        const data = CryptoJS.AES.encrypt(
          JSON.stringify(text),
          encryptedContent
        ).toString();
        return data;
      };
    const sendEmail = () => {
        if (!validateForm()) return;

        const formDataToSend = new FormData();
        formDataToSend.append("cc", formData.cc);

        // Ajoutez chaque destinataire
        formData.email_receiver.forEach((receiver, index) => {
            formDataToSend.append(`email_receiver[${index}]`, receiver.trim());
        });

        formDataToSend.append("email_sender", localStorage["email"]);
        formDataToSend.append("date", new Date());
        formDataToSend.append("subject", formData.subject);
        // formDataToSend.append("content", formData.content);
        const encryptContent = dataEncrypt(formData.content);
        formDataToSend.append("content", encryptContent);
        // Ajoutez le fichier seulement s'il est sélectionné
        if (formData.file) {
            formDataToSend.append("file", formData.file);
        }

        const instance = axios.create({
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        instance
            .post(`${process.env.REACT_APP_API_LINK}emails/send-email/`, formDataToSend)
            .then(function (res) {
                toast.success('Email sent successfully!', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1000 // Durée en millisecondes pour laquelle la notification reste visible
                });
               // Retarder le changement de page de 1 seconde (1000 millisecondes)
                setTimeout(() => {
                    window.location.href = "/sent";
                }, 1200);
              })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    setFormErrors({ email_receiver: "this account does not exist, or has been deleted, try again with another" });
                } else {
                    setFormErrors({ general: "An unexpected error occurred while sending." });
                }
            });
    };

    const saveDraft = () => {
        if (!validateForm()) return;

        const instance = axios.create({
            withCredentials: true,
        });

        instance.post(`${process.env.REACT_APP_API_LINK}drafts/draft/`,
            {
                cc: formData.cc,
                email_receiver: formData.email_receiver,
                email_sender: localStorage["email"],
                date: new Date(),
                subject: formData.subject,
                content: formData.content,
                draft: 1,
            })
            .then(function (res) {
                window.location.href = "/drafts";
                console.log(res.json());
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="page">
            <form className="">
                <h1>New email</h1>
                <div className="">
                    <label className="">
                        <input
                            name="email_receiver"
                            className="email_receiver"
                            type="text"
                            onChange={onFormChange}
                            placeholder="To"
                        />
                        {formErrors.email_receiver && <span className="text-red-600">{formErrors.email_receiver}</span>}
                        <p style={{ fontSize: '14px', color: '#6B6B6B', marginTop: '5px' }}>
                        If you wish to send your email to several recipients, please put a comma followed by a space between each email address" ,"
    </p>
                    </label>
                </div>
                <div className="">
                    <label className="">
                        <input name="cc" className="cc" type="email" onChange={onFormChange} placeholder="Cc" />
                        {formErrors.cc && <span className="text-red-600">{formErrors.cc}</span>}
                    </label>
                </div>
                <div className="">
                    <label className="">
                        <input name="subject" className="subject" type="text" onChange={onFormChange} placeholder="Subject" />
                        {formErrors.subject && <span className="text-red-600">{formErrors.subject}</span>}
                        
                    </label>
                </div>
                <div>
                    <label className="">
                        <textarea name='content' rows="10" className="content" onChange={onFormChange} placeholder='Type your message here..'>
                        </textarea>
                        {formErrors.content && <span className="text-red-600">{formErrors.content}</span>}
                    </label>
                </div>
                <div>
                    <label className="">
                        <input
                            name="attachment"
                            className="mx-6"
                            type="file"
                            onChange={onFileChange} // Ajoutez cette ligne pour gérer le changement de fichier
                        />
                    </label>
                </div>
                <div className="bouttons">
                    <a className="button1" type="button" onClick={sendEmail}>
                        <span>Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-telegram" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                        </svg>
                    </a>
                    <a className="button2" type="button" title='Save in drafts' onClick={saveDraft}>
                        Save
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-floppy" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                            <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M14 4l0 4l-6 0l0 -4" />
                        </svg>
                    </a>
                </div>
            </form>
            <style>
                {`
.body{
    height:80vh;
    overflow-y:auto;
}
                .page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top;
                    height:80vh;
    overflow-y:auto;
                }
                form{
                    width:60%;
                }
                .cc,
                 .email_receiver,
                  .subject  {
                    border-radius:20px;
                    border-color:#628ecb;
                    padding-left:10px;
                    margin-bottom:15px;
                    width:100%;
                }
                h1{
                    font-family:'Times New Roman', Times, serif;
                    font-weight:bold;
                    font-size:28px;
                    color:#395886;
                    margin-bottom:2vh;
                }
                .flex{
                    font-family: Arial, Helvetica, sans-serif;
                }
              
                .content {
                    width: 100%;
                    border-radius: 20px;
                    border-color: #628ecb;
                    padding-left: 3px;
                    height: 200px; 
                    overflow-y: hidden;
                    resize: none;
                    min-height: 50px;
                    margin-top:10px;

                }
                
                .button1,
                .button2{
                    border-radius:20px;
                    color:white;
                    display:flex; 
                    align-items:center; 
                    margin-top:5px;
                    height:6vh;
                    padding: 4px 20px;
                    font-family: Arial, Helvetica, sans-serif;
                    cursor: pointer;

                }
                .button1{
                    background-color:#395886;                  
                    margin-right:15px;
 
                }
                svg{
                    margin-left:3px;
                }
                .button2{
                    color:#395886;
                    border: 2px solid #395886;
                }
               
                .bouttons{
                    display:flex; 
                    align-items:center;
                    margin-right:auto;
                    margin-left:auto;
                    justify-content:center;
                    margin-top:5px;
                }                
                `}
            </style>
        </div>
    )
}

export default Compose;