
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 


import uclogo from '../images/uclogo.png';

const Navbar = () => {
    const location = useLocation(); 

    return (
        <div>
            <div>
                <nav>
                    <div className="logo">
                        <img src={uclogo} alt="Logo" /> 
                    </div>
                    <h1>UniCom</h1>
                    
                    <ul>
                        <li>
                            <Link to="/Home" className={location.pathname === '/Home' ? 'active-link' : ''}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/ContactUs" className={location.pathname === '/ContactUs' ? 'active-link' : ''}>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/AboutUss" className={location.pathname === '/AboutUss' ? 'active-link' : ''}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/help" className={location.pathname === '/help' ? 'active-link' : ''}>
                                Help
                            </Link>
                        </li>
                    </ul>
                
                </nav>
            </div>
            <style>
         {`

         
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #D5DEEF;
    color: white;
    padding: 10px 80px; 
    flex-wrap: wrap;
}

.logo img {
  font-size:9px;
  margin-top:-5vh;
  margin-left:-3.5vw;

}

ul {
    list-style-type: none;
    display: flex;
    gap: 100px; /* Ajustez l'espace entre les éléments de la liste */
    flex-wrap: wrap;
}

li {
    font-size: 18px;
}

a {
    text-decoration: none;
    color:  #628ecb;
    transition: color 0.3s ease;
    font-weight: bold;
}

a:hover {
    color: #395886;
    
}
.active-link {
    //text-decoration: underline;

    border-bottom: 2px solid #395886;
    
    color: #395886;
}

h1{
    font-weight:bold;
    color:#628ecb;
    margin-left:-32vw;
    font-size:30px;
   // margin-top:-20px;

  }
  @media screen and (max-width: 768px) {
    font-size: 50px;
    nav {
        flex-direction: column;
        align-items: flex-start; 
    }

    .logo img {
        margin-top: 0;
        margin-left: -100px;
    }

    h1 {
        margin-left: 0;
        margin-top: 10px;
    }
}

            `}
            </style>
        </div>
    );
};

export default Navbar;
