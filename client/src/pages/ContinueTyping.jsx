// // export default Forward;
// import React, { useState, useEffect } from "react";
// import { FaPaperPlane, FaSave } from "react-icons/fa";
// import axios from "axios";
// import { useLocation } from 'react-router-dom';

// function Forward() {
//   const location = useLocation();
//   const [content, setContent] = useState('');
//   const [subject, setSubject] = useState('');

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
    
//     const subjectParam = queryParams.get('subject');
//     const contentParam = queryParams.get('content');

//     if (contentParam) {
//       setContent(decodeURIComponent(contentParam));
//     }

//     if (subjectParam) {
//       setSubject(decodeURIComponent(subjectParam));
//     }
//   }, [location.search]);

//   const [formData, setFormData] = useState({
//     cc: '',
//     email_receiver: '',
//     email_sender: '',
//     date: '',
//     subject: '',
//     content: ''
//   });

//   const [formErrors, setFormErrors] = useState({})

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     setFormData({
//       ...formData,
//       subject: subject || '',
//       content: content || '',
//     });
//   }, [subject, content, location.search]);

//   const onFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData, [name]: value
//     })
//   }

//   const validateEmail = (email) => {
//     const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
//     return String(email)
//       .toLowerCase()
//       .match(
//         regExp
//       );
//   }

//   const validateForm = () => {
//     const errors = {}

//     if (!formData.email_receiver.trim()) {
//       errors.email_receiver = "Destination email required";
//     } else if (!validateEmail(formData.email_receiver.trim())) {
//       errors.email_receiver = "Email incorrect";
//     }

//     if (!formData.subject.trim()) {
//       errors.subject = "Subject required";
//     } else if (formData.subject.trim().length < 3) {
//       errors.subject = "Subject too short";
//     }

//     if (!formData.content.trim()) {
//       errors.content = "Content is empty";
//     } else if (formData.content.trim().length < 3) {
//       errors.content = "Content is too short";
//     }

//     if (formData.cc.trim() && !validateEmail(formData.cc.trim())) {
//       errors.cc = "cc email incorrect";
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   }

//   const sendEmail = () => {
//     if (!validateForm()) return;

//     const instance = axios.create({
//       withCredentials: true
//     });

//     instance.post(`${process.env.REACT_APP_API_LINK}emails/send-email/`, {
//       cc: formData.cc,
//       email_receiver: formData.email_receiver,
//       email_sender: localStorage["email"],
//       date: new Date(),
//       subject: formData.subject,
//       content: formData.content
//     })
//       .then(function (res) {
//         window.location.href = "/sent"
//         console.log(res.json());
//       })
//       .catch(function (error) {
//         console.log(error)
//       });
//   }

//   const saveDraft = () => {
//     if (!validateForm()) return;

//     const instance = axios.create({
//       withCredentials: true
//     });

//     instance.post(`${process.env.REACT_APP_API_LINK}drafts/draft/`, {
//       cc: formData.cc,
//       email_receiver: formData.email_receiver,
//       email_sender: localStorage["email"],
//       date: new Date(),
//       subject: formData.subject,
//       content: formData.content,
//       draft: 1
//     })
//       .then(function (res) {
//         window.location.href = "/drafts"
//         console.log(res.json());
//       })
//       .catch(function (error) {
//         console.log(error)
//       });
//   }

//   return (
//     <div className="text-left">
//       <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 mx-auto w-full">
//         <div className="w-1/2">
//           <label className="block text-gray-700 text-sm mb-2">
//             Destination
//             <input name="email_receiver" className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" onChange={onFormChange} placeholder="e-mail_receiver" />
//             {formErrors.email_receiver && <span className="text-red-600">{formErrors.email_receiver}</span>}
//           </label>
//         </div>
//         <div className="w-1/2">
//           <label className="block text-gray-700 text-sm mb-2">
//             CC
//             <input name="cc" className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" onChange={onFormChange} placeholder="e-mail_receiver" />
//             {formErrors.cc && <span className="text-red-600">{formErrors.cc}</span>}
//           </label>
//         </div>
//         <div className="w-1/2">
//           <label className="block text-gray-700 text-sm mb-2">
//             Subject
//             <input name="subject" className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={onFormChange} placeholder="subject" value={formData.subject} />
//             {formErrors.subject && <span className="text-red-600">{formErrors.subject}</span>}
//           </label>
//         </div>
//         <div>
//           <label className="block text-gray-700 text-sm mb-4">
//             Content
//             <textarea name="content" rows="10" className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-auto" onChange={onFormChange} placeholder="content" value={formData.content}></textarea>
//             {formErrors.content && <span className="text-red-600">{formErrors.content}</span>}
//           </label>
//         </div>
//         <div>
//           <label className="block text-gray-700 text-sm mb-2">
//             Attachment
//             <input name="attachment" className="mx-6" type="file"></input>
//           </label>
//         </div>
//         <div className="flex items-center text-center">
//           <button className="flex mt-6 btn-color py-2 px-4 rounded font-bold text-center text-white" type="button" onClick={sendEmail}>
//             Envoyer <FaPaperPlane width={12} className="mx-2 text-sm text-white"></FaPaperPlane>
//           </button>
//           <button className="mx-4 flex mt-6 py-2 px-4 rounded font-bold text-gray-700 border bg-white" type="button" onClick={saveDraft}>
//             Sauvegarder <FaSave width={12} className="mx-2 text-sm text-blue-600"></FaSave>
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Forward;
import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaSave } from "react-icons/fa";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function ContinueTyping() {
  const location = useLocation();
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [emailReceiver, setEmailReceiver] = useState('');
  const [cc, setCc] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const subjectParam = queryParams.get('subject');
    const contentParam = queryParams.get('content');
    const emailReceiverParam = queryParams.get('email_receiver');
    const ccParam = queryParams.get('cc');

    if (contentParam) {
      setContent(decodeURIComponent(contentParam));
    }

    if (subjectParam) {
      setSubject(decodeURIComponent(subjectParam));
    }

    if (emailReceiverParam) {
      setEmailReceiver(decodeURIComponent(emailReceiverParam));
    }

    if (ccParam) {
      setCc(decodeURIComponent(ccParam));
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
  const onFileChange = (e) => {
    setFormData({
        ...formData,
        file: e.target.files[0],
    });
};

  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setFormData({
      ...formData,
      subject: subject || '',
      cc: cc || '',
      content: content || '',
      email_receiver: emailReceiver || '',
    });
  }, [subject, content, emailReceiver, cc, location.search]);

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    });
    if(name === 'cc') {
      setCc(value);
    } else if (name === 'email_receiver') {
      setEmailReceiver(value);
    }
  }

  const validateEmail = (email) => {
    const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return String(email)
      .toLowerCase()
      .match(
        regExp
      );
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.email_receiver.trim()) {
      errors.email_receiver = "Destination email required";
    } else if (!validateEmail(formData.email_receiver.trim())) {
      errors.email_receiver = "Email incorrect";
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

    if (formData.cc.trim() && !validateEmail(formData.cc.trim())) {
      errors.cc = "cc email incorrect";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  }

  const sendEmail = () => {
    if (!validateForm()) return;

    const instance = axios.create({
      withCredentials: true
    });

    instance.post(`${process.env.REACT_APP_API_LINK}emails/send-email/`, {
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

    instance.post(`${process.env.REACT_APP_API_LINK}drafts/draft/`, {
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
        <h1>Continue typing..</h1>
        <div className="">
          <label className="">
          <input className="email_receiver" name="email_receiver" value={formData.email_receiver} onChange={onFormChange} type="email" placeholder="To" />
{formErrors.email_receiver && <span className="text-red-600">{formErrors.email_receiver}</span>}

          </label>
        </div>
        <div className="">
          <label className="">
    
          <input className="cc" name="cc" value={formData.cc} onChange={onFormChange} type="email" placeholder="Cc" />
{formErrors.cc && <span className="text-red-600">{formErrors.cc}</span>}

          </label>
        </div>
        <div className="">
          <label className="">
            
            <input className="subject" name="subject" value={formData.subject} onChange={onFormChange}  type="text" placeholder="Subject" />
            {formErrors.subject && <span className="text-red-600">{formErrors.subject}</span>}
          </label>
        </div>
        <div>
          <label className="">
            
            <textarea className="content" name="content" value={formData.content} onChange={onFormChange} rows="10" placeholder='Type your message here..' ></textarea>
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
            <style>  {`
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

export default ContinueTyping;
