import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import backgroundImage from '../images/backk.svg';
// import illustration from '';

function Home() {
 /* const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getInboxMessages = () => {
    axios
      .get(`http://localhost:5000/emails/`, {
        // Ici on utilise le Token pour se connecter avec une athnetification de type auth-2 Bearer
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoaded(false));
  }
  useEffect(() => {
    getInboxMessages()
  })*/
  return (
    <body>
    <div className='main'style={{backgroundImage: `url(${backgroundImage})`,}}>
      <div className='buttondiv'>
        <button><Link to='/ContactUs'>Contact us</Link></button>
        <button><Link to='/AboutUss'>About us</Link></button>
        <button><Link to='/Help'>Help</Link></button>
        <button><Link to='/Register'>Join us</Link></button>
        <button><Link to='/Login'>Sign in</Link></button>
        <button className='download'>Download</button>
      </div>
        <div className="homewelcome">
            <h1>Welcome to our app!</h1>
            <p className='textt'>Start your journey with us by creating an account
            <p className='textt'>or logging in if you already have one.</p>
            <div>
              <Link to='/Register'>
              <button className='starturj'>Start your journey</button>
              </Link>

            </div>
          </p>
        </div>
          <div className="imgcontainer">
            <img src='Emails-amico.svg'></img>
        </div>
    </div>

    <style>
      {`
body {
  font-family: Arial, sans-serif;
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
}

.main{
  font-family: Arial, sans-serif;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width:100vw;
  min-height: 100vh;
  background-image: url("/client/public/background.png");
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
}
.imgcontainer {
  width:500px;
  height: 400%;
  margin-top: 80px;
  padding: 10px 40px 10px 40px;
  border-style: none;
  margin-right:80px;
}
.imgcontainer img {
  width:100%;
  height:100%;
  margin-right:auto;
  margin-left:auto;
  margin-top:30px;
}
.homewelcome {
  margin: auto;
 
}
.homewelcome h1{
  font-family: 'Times New Roman', Times, serif;
  color:#395886;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 15px;
  margin-right:auto;
  margin-left:auto;
}
.homewelcome .textt{
  font-family: Arial, Helvetica, sans-serif;
  font-size:18px;
  margin-right:auto;
  margin-left:auto;
  color:black;
}
.homewelcome button{
  background-color: #395886;
  color:white;
  font-size: 16px;
  border-radius: 20px;
  padding: 5px 30px 5px;
}
.buttondiv{
  position: absolute;
  top: 80px;
  right: 120px; 
  display: flex;
  flex-direction: row;
}
.buttondiv button {
  margin-left:60px;
  color:#395886;
  border-style: none;
  background-color: transparent;
}
.buttondiv .download{
  background-color: #395886;
  border-radius: 20px;
  padding:5px 30px 5px;
  color:white;
}
button:hover{
  text-decoration:underline;
}
.starturj{
  margin-top:40px;
}

`}
    </style>
  </body>  
  );
}

export default Home;
 