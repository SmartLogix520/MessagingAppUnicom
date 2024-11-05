


// import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        email: 'askUnicom@uni.com' ,
        subject: '',
        message: '',
      });
    
      const [formErrors, setFormErrors] = useState({});
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
  
    
      const sendEmail = () => {
          const instance = axios.create({
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
          const predefinedEmailReceiver = "askUnicom@uni.com";
        
          const emailData = {
            email_sender: localStorage["email"],
            email_receiver: [predefinedEmailReceiver],
            date: new Date(),
            subject: formData.subject,
            content: formData.message,
          };
         
          instance
            .post(`${process.env.REACT_APP_API_LINK}emails/send-email/`, emailData)
            .then(function (res) {
              window.location.href = "/sent";
              console.log(res.data);
            })
            .catch(function (error) {
              console.log(error);
              if (error.response && error.response.status === 400) {
                setFormErrors({ email_receiver: "ce compte n'existe pas. resseayer avec un autre" });
              } else {
                setFormErrors({ general: "Une erreur inattendue s'est produite lors de l'envoi." });
              }
            });
        };
    return (

        <div>
            <Navbar />
            <div className="ContactUs-container">
                <div id="address" className="info-section">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="55" height="55" viewBox="0 0 24 24" stroke-width="1.5" stroke="#395886" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                    </svg>
                    <h2 className="info-title">ADDRESS</h2>
                    <p>Departement informatique/ Bastos TIZI-OUZOU</p>
                </div>



                <div id="warning" className="info-section">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-world-upload" width="55" height="55" viewBox="0 0 24 24" stroke-width="1" stroke="#395886" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M21 12a9 9 0 1 0 -9 9" />
                        <path d="M3.6 9h16.8" />
                        <path d="M3.6 15h8.4" />
                        <path d="M11.578 3a17 17 0 0 0 0 18" />
                        <path d="M12.5 3c1.719 2.755 2.5 5.876 2.5 9" />
                        <path d="M18 21v-7m3 3l-3 -3l-3 3" />
                    </svg>
                    <h2 className="info-title">SOCIAL NETWORKS</h2>
                       
                    <a href="https://web.facebook.com/profile.php?id=61554257034270" className="social-link" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="facebook" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#395886" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                        </svg>
                        ComputerWizards
                    </a>

                    <a href="https://www.instagram.com/computerwizards19?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-link" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="instagram" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#395886" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            <path d="M16.5 7.5l0 .01" />
                        </svg>
                        ComputerWizards
                    </a>

                    <a href="https://www.linkedin.com/company/computerwizard-s/" className="social-link" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-linkedin" width="30" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#395886" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                            <path d="M8 11l0 5" />
                            <path d="M8 8l0 .01" />
                            <path d="M12 16l0 -5" />
                            <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                        </svg>
                        ComputerWizards
                    </a>


                </div>

                <div id="email" className="info-section">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="60" height="60" viewBox="0 0 24 24" stroke-width="1" stroke="#395886" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                        <path d="M3 7l9 6l9 -6" />
                    </svg>
                    <h2 className="info-title">EMAIL ADRESS</h2>
                    <p>computerwizards19@gmail.com</p>
                   
                </div>
            </div>
            <div className='ContactUs'>
                <div className='Contactus1'>
                    <h4>CONTACT US</h4>
                    <div className='Contactus'>
                        <h2>If you're interested in having a conversation, feel free to send us a message.</h2>
                    </div>
                    <ul>
                        <div className='IconReseaux'>
                            <li> <a href="https://web.facebook.com/profile.php?id=61554257034270" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="facebook" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#395886" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                </svg>

                            </a></li>
                            <li><a href="https://www.linkedin.com/company/computerwizard-s/" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-linkedin" width="30" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#395886" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                    <path d="M8 11l0 5" />
                                    <path d="M8 8l0 .01" />
                                    <path d="M12 16l0 -5" />
                                    <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                                </svg>
                            </a></li>


                            <li><a href="https://www.instagram.com/computerwizards19?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="instagram" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#395886" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                    <path d="M16.5 7.5l0 .01" />
                                </svg>

                            </a></li>

                        </div>
                    </ul>
                </div>
                <div>
                    <div>

                         {/* Formulaire simplifié pour ContactUs */}
                         <form className="">
              <h1>Contact us</h1>
              <div className="">
                <label className="">
                  <input
                    name="email"
                    className="email"
                    type="text"
                    onChange={handleChange}
                    placeholder="askUnicom@uni.com"
                    value={formData.email}
                  />
                </label>
              </div>
              <div className="">
                <label className="">
                  <input
                    name="subject"
                    className="subject"
                    type="text"
                    onChange={handleChange}
                    placeholder="Subject"
                    value={formData.subject}
                  />
                </label>
              </div>
              <div>
                <label className="">
                  <textarea
                    name="message"
                    rows="10"
                    className="message"
                    onChange={handleChange}
                    placeholder="Your message (optional)"
                    value={formData.message}
                  ></textarea>
                </label>
              </div>
              <div>
                <button type="button" className="ButtonSub" onClick={sendEmail}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
            <Footer />
            <style>
                {

                    `
.about-container {
    display: flex;
    flex-direction: row;
    margin-top: 20vh;
}

/* Pour les écrans plus petits */
@media (max-width: 600px) {
    .about-container {
        flex-direction: column;
    }

    .info-section {
        width: 70vw !important;
        margin-top: 2vh !important;
        margin-left: 10vw !important;
        
    }

    .ContactUs {
        flex-direction: column !important;
    }

    .Contactus1 {
        text-align: center !important;
        width: 100vw !important;
    }
}

// body {
//    background-color: red;
//    font-family:Arial,Helvetica,sans-serif;

// }

.ContactUs-container {
    display: flex;
    flex-direction: row;
    margin-top: 20vh;
}

body {
    background-color: #F0F3FA;
    


    font-family:Arial,Helvetica,sans-serif;


}


@media screen and (max-width: 768px) {
    .ContactUs-container {
        flex-direction: Column;
        margin-top: 15vh;
        width: 70vw;
        display: flex;

    }

    .info-section {
        width: 70vw !important;
        margin-top: 5vh !important;
        margin-left: 10vw !important;
        
    }

    .info-title {
        margin-bottom: 1vh;
        margin-top: 1vh;
        font-size: 1.5rem;
    }
}

.icon-tabler{
    display: inline-block;
    vertical-align: middle;
}

.info-section {
    border-radius: 2vw;
    padding: 2vw 0;
    text-align: center;
    width: 22vw;

    margin-top: 13vh;
    margin-left: 8vw;
    background-color: #D5DEEF;
    // margin-left: auto;
    
}

.info-section:hover {
    background: linear-gradient(to bottom, #F0F3FA, #395886);
    color: #F0F3FA;
}

.info-section i {
    font-size: 3rem;
    margin-top: 5vh;
    color: #8AAEE0;
    
}


.info-title {
    font-weight: bold;
    margin-bottom: 2vh;
    margin-top: 2vh;
    font-family:'Times New Roman',Times,serif;
}



.info-section p {
    font-size: 1.3vw; 
    font-family:Arial,Helvetica,sans-serif;
 

}

.social-link {
    color: black; 
    
    margin-right: 10px; 
    display: flex;
    text-align: center;
    font-size: 1.5vw; 
    font-family:Arial,Helvetica,sans-serif;
    margin-bottom:2vh;
 
}


.ContactUs {
    display: flex;
    flex-direction: row;
    margin-top: 30vh;
    background-color: #F0F3FA;
    border-radius: 5vw;
    
   
    
}

.Contactus1 {
    width: 54vw;
    margin-left: 2vw;
    margin-right: 2vw;
    margin-top: 0.5vh;
}

.Contactus1 h4 {
    color: #628ECB;
    font-size: 2rem;
    font-weight: 500;
    width: -5px;
    margin-top: 30px;
    font-family:Arial,Helvetica,sans-serif;
}

.Contactus1 h2 {
    color: #395886;
    font-size: 3rem;
    font-weight: 500;
    width: -5px;
    font-family:'Times New Roman',Times,serif;
}



.IconReseaux {
    text-align: center;
    margin-left:50vw;
}

.InputDiv {
    min-width: 30vw;
    margin-top: 50px;
    margin-left: 5vw;
    margin-bottom: -0.4vh;
    padding: 8px 15px; 
    width: 20%;
    border-radius: 20px;
  border-color: #628ECB;
}

.ButtonSub {
    background-color: #395886;
    color: #F0F3FA;
    margin-top: 5vh;
    font-size: 100%;
    margin-left: 20vw;
    padding-left: 50px;
    padding-right: 40px;
}

.ButtonSub:hover {
    background-color: #8AAEE0;
    color: #F0F3FA;
}


.IconReseaux  {
    margin-top: -15vh;
    width: 5vw;
    height: 50vh;
    display: flex;
    margin-left: -50vw;
    align-items: center;
}


.IconReseaux li {
    margin-top: 5vh;
    background-color: #F0F3FA;
    color: white;
    width: 6vw;
    height: 5vh;
    display: flex;
    border-radius: 5vw;
    margin: 4vh 0.5vw;
    transition: background-color 0.3s ease;
    box-sizing: content-box;
    align-items: center;
    justify-content: center;
    display: flex;

}




.IconReseaux li:hover {
    background-color: #B1C9EF;
  

}
input::placeholder {
    color: #628ECB;
    font-size: 14px;
    font-family:Arial,Helvetica,sans-serif;

}

input {
    margin-bottom: 50px; 
    
   
}




`


                }




            </style>


        </div>


    );

};

export default ContactUs;