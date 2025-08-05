// // export default Login;


import { useState, React } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
// import '../Register.css';
// console.log("je suis ici")
function Login() {
   const [loginError, setLoginError] = useState('');
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   // Définir un tableau pour les erreurs
   const [formErrors, setFormErrors] = useState({})
   const navigate = useNavigate()
   const [emailFocused, setEmailFocused] = useState(false);
   const [passwordFocused, setPasswordFocused] = useState(false);
   const [login, setLogin] = useState(true);
   const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

   // Fonction pour gérer le focus sur le champ Email
   const handleEmailFocus = () => {
     setEmailFocused(true);
   };
 
   // Fonction pour gérer la perte de focus sur le champ Email
   const handleEmailBlur = () => {
     setEmailFocused(false);
   };
 
   const changeEmail = (e) => {
    setEmail(e.target.value)
   }

   const changePassword = (e) => {
    setPassword(e.target.value)
   }

  const onSubmit = (e) => {
    e.preventDefault();
    setLogin(false)
    const errors = {}

    // // Validation de l'émail
    // if (!email.trim())
    //     errors.email = "Veuillez renseigner votre email"
    // else if (!validateEmail(email.trim()))
    //     errors.email = "Email incorrect"
    
// Validation de l'émail
if (!email.trim())
errors.email = "Veuillez renseigner votre email"
else if (!validateEmail1(email.trim())) errors.email = "Invalid E-mail address. Please ensure it ends with '@uni.com'";

    // Validate du mot de passe
    if (!password.trim())
        errors.password = "Veuillez renseigner le mot de passe"
    else if (password.trim().length < 1)
        errors.password = "Le mot de passe est trop court"

    // Enregistrer les erreurs
    setFormErrors(errors);

    if (Object.keys(formErrors).length === 0) {
      // Appeler la fonction Login seulement s'il n'y a pas d'erreurs
      Login();
  }
  }
/////////////////////////////////////////////////////////////////////
const validateEmail1 = (email) => {
  // Utilisez une expression régulière pour vérifier si l'email se termine par '@uni.com'
  const emailRegex = /@uni\.com$/;
  return emailRegex.test(email);
};
  const validateEmail = (email) => {
    // Expression régulière simple pour une adresse email
    const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return String(email)
        .toLowerCase()
        .match(
            regExp
        );
  };

  const Login = () => {
    axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password
      }, {
        // Include cookies in the request
        withCredentials: true
    }).then((res) => {
        if (res.data.error) {
          setLoginError(res.data.error);
          setLogin(true)
          // Mettez à jour directement formErrors
 
        } else {
          setLoginError(res.data.error);
          console.log("je suis ici 3")
          // En cas de succès, réinitialisez les messages d'erreur liés à la connexion
          // setFormErrors({});
          // Sauvegardez les données de connexion et redirigez si nécessaire
          setLogin(true)
          localStorage["emailu"] = res.data.email;
          localStorage['user_id'] = res.data._id;
          navigate("/Recup2fa");
        }
    }).catch((error) => {
      setLogin(true)
       if (error.response && error.response.data && error.response.data.error) {
          setLoginError(error.response.data.error);
        } else {
          setLoginError("An unknown error occurred. Please try again.");
        }
   
    
    });
}
  return (
    
    <div>
      
      <div className='main' style={{
      
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#D5DEEF',
        width: '100%',
        minHeight: '100vh',
      }}>
        <div className="welcome" style={{
          margin: 'auto',
          marginLeft: '80px',
          marginRight: '50px',
        }}>
            <img src='Logo.png' alt="Envelop icon" style={{
            width: '50%',
            height: '50%',
            // marginRight: '20px',
            marginLeft: '-180px',
            marginTop : '-260px',
          }} />
          <img src='envelope1.svg' alt="Envelop icon" style={{
            width: '50%',
            height: '50%',
            marginRight: 'auto',
            marginLeft: 'auto',
          }} />
        
        </div>

        <div className="container" style={{
          width: '500px',
          height: '75%',
          marginTop: '80px',
          padding: '10px 40px 10px 40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '20px',
          backgroundColor: '#D5DEEF',
          backdropFilter: 'blur(15px)',
          background: 'rgba(255,255,255,0.2)',
          marginRight: '80px',

        }}>
          <form onSubmit={onSubmit}>
            <p className='sign-in' style={{
              fontFamily: 'Times New Roman, Times, serif',
              fontSize: '30px',
              color: '#395886',
              fontWeight: 'bolder',
            }}>Sign in</p>
            <div className="mb-4" style={{ fontSize: '13px' }}>
            <label
              className="block "
              style={{
                width: '20%',
                fontSize: '16px',
                color:'#395886'
                
              }}
              htmlFor="username"
            >
              E-mail
            </label>
            <input
              id="username"
              type="text"
              placeholder="E-mail"
              className='text-black black '
              onChange={(e) => changeEmail(e)}
              onFocus={handleEmailFocus} // Gérer le focus
          onBlur={handleEmailBlur}   // Gérer la perte de focus
          style={{
           
            width: '100%',
            padding: '5px 15px 5px',
            marginTop: '20px',
            border: '1px solid #628ecb',
            boxSizing: 'border-box',
            borderRadius: '20px',
            fontSize: '13px',
            background: emailFocused ? 'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
          }}
        />

              {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
            </div>
            <div className="mb-6">
            <label
              className="block"
              style={{
                width: '25%',
                fontSize: '16px',
                color:'#395886'
                
              }}
             htmlFor="password"
            >
              Password
            </label>
           <input
          type="password"
          placeholder="Password"
          onChange={changePassword}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          value={password}
          style={{
            marginTop:'5px',
            marginBottom: '8px',
            width: '100%',
            borderRadius: '20px',
            background: passwordFocused ?  'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
            padding: '5px 15px 5px',
          }}
        />

              {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
              {loginError && <p className="text-red-500">{loginError}</p>}
            </div>

            <p>
              {/* <a href="#" id="forgotPassword" style={{ */}
              <a href="/recup" id="forgotPassword" style={{
                textDecoration: 'none',
                fontSize: '15px',
                marginTop: '2px',
                color: '#395886',
                marginRight: 'auto'
              }}>Forgot password&#63;</a>
            </p>
            <button type="submit" disabled={!login} style={{
              backgroundColor: '#395886',
              border: 'none',
              color: 'white',
              padding: '5px 40px 5px',
              display: 'inline-block',
              fontSize: '16px',
              marginTop: '16px',
              marginBottom: '20px',
              cursor: 'pointer',
              transitionDuration: '0.4s',
              borderRadius: '20px',
              position: 'relative',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>Log in</button>
            <p style={{ marginBottom: '20px', fontSize: '15px' }}>
              Not a member yet&#63; <Link className='link' to='/Register' style={{
                textDecoration: 'none',
                fontSize: '15px',
                marginTop: '2px',
                color: '#395886',
                marginRight: 'auto'
              }}>Create an account</Link>
            </p>
          </form>
          <p className="text-center text-black-500 text-xs">&copy; Unicom</p>
        </div>
      </div>
      
    </div>
  );
}

export default Login;