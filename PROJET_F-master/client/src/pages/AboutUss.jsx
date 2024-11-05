import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
const AboutUss = () => {
  return (
    <div className="about-us-container">
        <Navbar />
      <div className="about-us-header">
        {/* <h1>About Us</h1> */}
      </div>
      <div className="about-us-content">
       
             <img className='image1' src='Digital nomad-pana.svg' ></img>
            <div className="about-us-text">
            <h>Our App</h>
            <p>
            Welcome to <span>UniCom</span>, your gateway to seamless and universal communication! Our app, short for Universal Communication, is a multifaceted platform designed to simplify your digital interactions. With <span>UniCom</span>, you can effortlessly send texts, emails, initiate video calls, and organize virtual reunions, all within one intuitive interface. Our commitment to user-friendly design ensures that navigating through various features is a breeze, making UniCom accessible to users of all backgrounds. Whether you're connecting with friends, family, or colleagues, our app offers a streamlined experience that brings people closer together. Embrace the simplicity and efficiency of UniCom, and embark on a new era of communication where staying connected is as easy as a tap away. Try UniCom today and discover the joy of unified and hassle-free communication!
          </p>
        </div>
      </div>
      <div className="about-us-content">
        
        <div className="about-us-text">
            <h>Our team</h>
          <p>
                    Meet <span>Computer Wizards</span>, an exceptional team comprised of 19 Master 2 Computer Science students who have passionately collaborated to bring this app to life. Under the expert guidance of Professor Si Mohammed, we've dedicated ourselves to pushing the boundaries of technology. Our diverse talents converge in a dynamic environment where innovation flourishes, each member contributing unique skills in programming, design, and project management. Through this journey, we've seamlessly blended academic knowledge with practical application, fostering a collaborative spirit. <span>Computer Wizards</span> is more than a team; it's a community of learners, innovators, and hopefully future tech leaders, prepared to make a lasting impact on the digital communication landscape. Join us as we proudly present the culmination of our efforts, a testament to our dedication and the endless possibilities when passionate minds come together.
          </p>
        </div>
         <img className='image1' src='New team members-pana.svg'></img>
        </div>
        
      <div className="about-us-content">
      <img className='image1' src='Coworking-rafiki.svg'></img>
        <div className="about-us-text">
            <h>Our UniCom journey</h>
          <p>
          Embarking on the creation of <span>UniCom</span> has been an exhilarating journey, marked by the dedication and collaborative spirit of our <span>Computer Wizards</span> team. From the outset, our process was organized, with each subgroup focusing on specific components of the app, fostering a streamlined and efficient workflow. This division of responsibilities not only ensured clarity but also allowed every member to leverage their unique skills and expertise. As Master's students in Computer Science, <span>UniCom</span> represents our first dive into a significant real-world project. The challenges we encountered were met with enthusiasm, propelling us to explore and master new technologies. Every team member gave their best, delving into research and embracing a continuous learning curve. <span>UniCom</span>'s development became a catalyst for growth, broadening our perspectives and offering invaluable insights into the complexities of large-scale projects. This experience has undoubtedly been a cornerstone in our academic journey, providing us with newfound skills, insights, and the confidence to create the best possible product. Our process is not just about creating an app; it's about pushing boundaries, pursuing excellence, and evolving together as a team. <span>UniCom</span> stands as a testament to our commitment to innovation and the pursuit of excellence in every aspect of our process.
          </p>
          </div>
            
      </div>
      {/* <footer className="blue-footer">
        <div className='socials'>
            <div className='CompWiz'>
            <div className='title'><img src='cwlogo.png'className='logo'></img><p>Computer Wizards</p>  </div>
                <div className='reseaux'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="reseau" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M16.5 7.5l0 .01" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="reseau" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                        <path d="M8 11l0 5" />
                        <path d="M8 8l0 .01" />
                        <path d="M12 16l0 -5" />
                        <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="reseau" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                    </svg>
                </div>
            </div>
      
        <div className='UnCom'>
        <div className='title'><img src='uclogo.png'className='logo'></img><p>UniCom</p> </div> 
                <div className='reseaux'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="reseau" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M16.5 7.5l0 .01" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="reseau" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                        <path d="M8 11l0 5" />
                        <path d="M8 8l0 .01" />
                        <path d="M12 16l0 -5" />
                        <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="reseau" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                    </svg>
                </div>
            </div>
        </div>
       
        <div className='contact-us'>
             <h>Contact us:</h>
             <p>computerwizards@uni.com</p>
             <p>unicom@uni.com</p>
        </div>
        <div className='right'>
            <p>By Computer Wizards</p>
            <p>Mouloud Mammeri University</p>
            <p> ©2024 UniCom</p>
        </div>
       
      </footer> */}
        <Footer />
      <style>
        {`body {
            overflow-x: hidden;
            background-color:#e0e8f5;
          }
            .about-us-container {
              //display: flex;
              flex-direction: column;
              justify-content:space-between;
              width:100%;
              align-items: center;
              //padding-right: 10%;
              //padding-left: 10%;
              font-family: Arial, Helvetica, sans-serif;
              min-height:100vh;
              margin-right:auto;
              margin-left:auto;
            }

            .about-us-header {
            margin-bottom:30px;
            margin-top:30px;
            color:#395886;
            font-family: 'Times New Roman', Times, serif;
            font-size:40px;
            font-weight:bold;
            }

            .about-us-content {
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            width: 100%;
            margin-bottom:10%;
            margin-right:auto;
            margin-left:auto;
            }
            span{
                font-weight:bold;
                color:#8aaee0;
            }
            .about-us-text {
            width:50%;
            margin-top:auto;
            margin-bottom:auto;
            margin-right:5vw;
            }
            .image1{
             width:50%;
             height:65vh;
            }
            .about-us-text p {
                font-size: 18px;
                line-height: 1.5;
            //     margin-bottom: 30px;
            //     text-align: justify; 
            //     margin-top:30px;
            margin-right:20px;
            margin-left:20px;
            text-align: justify; 
            margin-top:50px;
          }
            .about-us-text h{
                font-size: 30px;
                color:#628ecb;
                font-family: 'Times New Roman', Times, serif;
                font-weight:bold;
                margin-bottom: 30vh;
            }
            .about-us-image {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            
            }

            .about-us-image img {
            max-width: 100%;
            height: auto;
            }
            
            `}
                </style>
                </div>
            );
            };
            export default AboutUss;