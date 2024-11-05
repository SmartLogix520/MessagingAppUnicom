import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Recupp = () => {
  const [codeValidation, setCodeValidation] = useState('');
  const [etape, setEtape] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  // Définir un tableau pour les erreurs
  const [passwordError, setPasswordError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleRetour = () => {
    setEtape((prevEtape) => Math.max(prevEtape - 1, 1));
    // Clear error messages when going back
    setPasswordError('');
    setCodeError('');
    setGeneralError('');
    setEmailError('');
  };

  const handleChangeCode = (e) => {
    setCodeValidation(e.target.value);
  };

  const handleVerifierCode = () => {
    const trimmedCode = codeValidation.trim();

    if (trimmedCode === '') {
      setCodeError('Please enter a validation code.');
    } else if (trimmedCode.length !== 4) {
      setCodeError('Validation code must be exactly 4 characters.');
    } else {
      const userEmail = localStorage.getItem('emailu');
      console.log('DFHG', userEmail);
      axios
        .post(
          `${process.env.REACT_APP_API_LINK}auth/verifyOTP2fa`,
          {
            email: userEmail,
            otp: codeValidation,
          },
          {
            // Include cookies in the request
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log('DF', res?.data);
          if (res?.data?.email) {
            localStorage['email'] = userEmail;
            setCodeError('Correct validation code.');
            navigate('/');
          } else {
            if (
              res?.data?.status === 'FAILED' &&
              res?.data?.message === 'Code has expired.Please request again'
            ) {
              setCodeError('Code has expired. Please request again.');
            } else if (
              res?.data?.status === 'FAILED' &&
              res?.data?.message === 'Invalid code passed.chek your inbox'
            ) {
              setGeneralError('Incorrect validation code. Please try again.');///////
            } else {
              setGeneralError('An error occurred. Please try again.');
            }
          }
        })
        .catch((err) => {
          console.error(err);
          setGeneralError('An error occurred. Please try again.');
        });
    }
  };

  return (
    <div className="container">
      <a href="/Login" className="retour-button" onClick={handleRetour}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-left"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
      </a>

      {etape === 1 && (
        <div>
          <img
            src="Logo.png"
            alt="Envelop icon"
            style={{
              width: '550%',
              height: '90%',
              marginLeft: '-8px',
              marginTop: '-100px',
            }}
          />
          <p className="optiontext">Enter the validation code below:</p>
          <input
            type="text"
            placeholder="Type your code here.."
            value={codeValidation}
            onChange={handleChangeCode}
          />
          <button href="/Inbox" onClick={handleVerifierCode}>
            Verify the code
          </button>
          <br></br>
          <br></br>
          <br></br>
        </div>
      )}

      {codeError && <div className="error-message">{codeError}</div>}
      {generalError && <div className="error-message">{generalError}</div>}

      <style>
        {`
          body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f4f4f4;
          }

          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            border-radius: 20px;
          }

          .retour-button {
            position: absolute;
            top: 10px;
            left: 25px;
            padding: 0;
            cursor: pointer;
            background-color: transparent;
            color: black;
          }

          .nextbutton {
            border-radius: 20px;
            font-size: 15px;
            background-color: #395886;
            padding: 10px 15px 10px;
            position: absolute;
            bottom: 10px;
            right: 25px;
            cursor: pointer;
          }

          .error-message {
            color: red;
            margin-top: 10px;
            font-size: 14px;
          }
          button {
            padding: 10px 20px;
            border: none;
            border-radius: 15px;
            background-color: #395886;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        `}
      </style>
    </div>
  );
};

export default Recupp;