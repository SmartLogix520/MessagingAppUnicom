import React from "react";
import { useState, useEffect } from "react";
import { FaPaperPlane, FaSave } from "react-icons/fa";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';


function Reply() {
    
    const location = useLocation();
    const [receiver, setReceiver] = useState('');
    const [subject, setSubject] = useState('');
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const receiverParam = queryParams.get('receiver');
      const subjectParam = queryParams.get('subject');
  
      if (receiverParam) {
        setReceiver(decodeURIComponent(receiverParam));
      }
  
      if (subjectParam) {
        // Vous pouvez ajuster la logique pour retirer le préfixe "Re:" si nécessaire
        setSubject(decodeURIComponent(subjectParam));
      }
    }, [location.search]);
  
    const [formData, setFormData] = useState({
        cc: '',
        email_receiver: '',
        email_sender: '',
        date: '',
        subject: '',
        content: ''
    });

    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setFormData({
          ...formData,
          email_receiver: receiver || '',
          subject: subject || '',
        });
      }, [receiver, subject, location.search]);

    const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    const validateEmail = (email) => {
        const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return String(email)
            .toLowerCase()
            .match(
                regExp
            );
    }

    const validateForm = (e) => {
        
    const errors = {}
    if (!formData.email_receiver.trim())
        errors.email_receiver = "Destination email required"
    else if (!validateEmail(formData.email_receiver.trim()))
        errors.email_receiver = "Email incorrect"

    if (!formData.subject.trim())
        errors.subject = "Subject required"
    else if (formData.subject.trim().length < 3)
        errors.subject = "Subject too short"

    if (!formData.content.trim())
        errors.content = "Content is empty"
    else if (formData.content.trim().length < 3)
        errors.username = "Content is too short"

    if (formData.cc.trim())
        if (!validateEmail(formData.cc.trim().length))
            errors.cc = "cc email incorrect"

    setFormErrors(errors);
    if (Object.keys(formErrors).length === 0)
            return true
        else
            return false;
    }
    const onSubmit = (e) => {
       
        e.preventDefault();
    }

    const sendEmail = () => {

        if (!validateForm()) return;
        
        const instance = axios.create({
            withCredentials: true
        });

        instance.post(`${process.env.REACT_APP_API_LINK}emails/send-email/`,
            {
                cc: formData.cc,
                email_receiver: formData.email_receiver,
                email_sender: localStorage["email"],
                date: new Date(),
                subject: formData.subject,
                content: formData.content
            })
            .then(function (res) {
                window.location.href = "/sent"
                console.log(res.json());
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    const saveDraft = () => {
      
        if (!validateForm()) return;

        const instance = axios.create({
            withCredentials: true
        });

        instance.post(`${process.env.REACT_APP_API_LINK}drafts/draft/`,
            {
                cc: formData.cc,
                email_receiver: formData.email_receiver,
                email_sender: localStorage["email"],
                date: new Date(),
                subject: formData.subject,
                content: formData.content,
                draft: 1
            })
            .then(function (res) {
                window.location.href = "/drafts"
                console.log(res.json());
            })
            .catch(function (error) {
                console.log(error)
            });
    }
return (
  <div className="page">
  <form className="">
      <h1>Reply</h1>
        <div className="">
        <label className="">
                        <input
                            name="email_receiver"
                            className="email_receiver"
                            type="email"
                            onChange={onFormChange}
                            placeholder="To"
			                      value={formData.email_receiver}
                        />
            {formErrors.email_receiver && <span className="text-red-600">{formErrors.email_receiver}</span>}
          </label>
        </div>
        <div className="">
                    <label className="">
                        <input name="cc" className="cc" type="email" onChange={onFormChange} placeholder="Cc" value={formData.cc} />
            {formErrors.cc && <span className="text-red-600">{formErrors.cc}</span>}
          </label>
        </div>
        <div className="">
          <label className="">
            <input
              name="subject"
              className="subject"
              type="text"
              onChange={onFormChange}
              placeholder="subject"
              value={formData.subject}
            />
            {formErrors.subject && <span className="text-red-600">{formErrors.subject}</span>}
          </label>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-4">
            
            <textarea
              name="content"
              rows="10"
              className="content"
              onChange={onFormChange}
              placeholder="Type your reply here.."
              value={formData.content}
            />
            {formErrors.content && <span className="text-red-600">{formErrors.content}</span>}
          </label>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">
            <input name="attachment" className="mx-6" type="file"></input>
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
                     main{           
                        left:auto;
                        right:auto;
                        margin:0;
                        overflow:auto;
                        height:100%;
                        width:100%;
                        /*border-radius:20px;*/
                        border-style:none;}
        

                .page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top:
                }
                form{
                    width:60%;
                }
                .cc,
                 .email_receiver,
                  .subject  {
                    border-radius:20px;
                    border-color:#628ecb;
                    margin-bottom:15px;
                    width:100% !important;
                    font-size:15px;
                }
                .cc::placeholder,
                .email_receiver::placeholder,
                .subject::placeholder,
                .content::placeholder {
                    color: #628ecb !important;
                    font-size: 14px;
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
export default Reply;