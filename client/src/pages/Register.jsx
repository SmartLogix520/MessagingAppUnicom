// export default Register;
import { useState,React } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import '../Register.css';
import { useNavigate } from "react-router-dom"

const options = [
  { label: 'Select Gender', value: '' }, // Ajout d'une option par défaut
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

function Register() {
  const [RegisterError, setRegisterError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [trustEmail, setTrustEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [trustEmailError, setTrustEmailError] = useState('');
  // const [formErrors, setFormErrors] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [trustEmailFocused, setTrustEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmpasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [birthdateFocused, setBirthDateFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const toggleHint = () => {
    setShowHint(!showHint);
  };
  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };
 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };
  const handleConfirmPasswordFocus = () => {
    setConfirmPasswordFocused(true);
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordFocused(false);
  };
  const handleBirthDateFocus = () => {
    setBirthDateFocused(true);
  };

  const handleBirthDateBlur = () => {
    setBirthDateFocused(false);
  };
  const handleFirstNameFocus = () => {
    setFirstNameFocused(true);
  };

  const handleFirstNameBlur = () => {
    setFirstNameFocused(false);
  };
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleLastNameFocus = () => {
    setLastNameFocused(true);
  };

  const handleLastNameBlur = () => {
    setLastNameFocused(false);
  };
  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handleUsernameBlur = () => {
    setUsernameFocused(false);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' });
  };
  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
  };
  const handlePhoneNumberFocus = () => {
    setPhoneNumberFocused(true);
  };

  const handlePhoneNumberBlur = () => {
    setPhoneNumberFocused(false);
  };
  const changeTrustEmail = (e) => {
    setTrustEmail(e.target.value);
    setTrustEmailError('');
  };
  const handleTrustEmailFocus = () => {
    setTrustEmailFocused(true);
  };

  const handleTrustEmailBlur = () => {
    setTrustEmailFocused(false);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeLastname = (e) => {
    setLastName(e.target.value);
  };

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePhoneNumber = (e) => {
    const inputNumber = e.target.value.replace(/\D/g, '');
    setPhoneNumber(inputNumber);

    if (inputNumber.length !== 10 || !validatePhoneNumber(inputNumber)) {
      setErrors({
        ...errors,
        phoneNumber: 'Please enter a valid phone number',
      });
    } else {
      setErrors({ ...errors, phoneNumber: '' });
    }
  };

  const validatePhoneNumber = (number) => {
    const algerianNumberRegex = /^(0)(5|6|7)\d{8}$/;
    return algerianNumberRegex.test(number);
  };

  const changeGender = (e) => {
    setGender(e.target.value);
  };

  // const changeBirthDate = (e) => {
  //   const enteredDate = e.target.value;

  //   const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  //   if (dateRegex.test(enteredDate)) {
  //     setBirthDate(enteredDate);
  //     setFormErrors({ ...formErrors, birthDate: '' });
  //   } else {
  //     setFormErrors({
  //       ...formErrors,
  //       birthDate: 'Please enter a valid date of birth.',
  //     });
  //   }
  // };
  const changeBirthDate = (e) => {
    const enteredDate = e.target.value;
  
    const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  
    if (dateRegex.test(enteredDate)) {
      setBirthDate(enteredDate);
  
      const birthYear = parseInt(enteredDate.split("-")[0]);
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
  
      if (age < 18) {
        setErrors({
          ...errors,
          birthDate: 'You must be at least 18 years old to register.',
        });
      } else {
        setErrors({ ...errors, birthDate: '' });
      }
    } else {
      setErrors({
        ...errors,
        birthDate: 'Please enter a valid date of birth.',
      });
    }
  };
  
  const Register = () => {
   
    axios.post('http://localhost:5000/auth/register', {
        first_name: firstName,
        last_name: lastName,
        username: username,
        phone_number: phoneNumber,
        confirmpassword: confirmpassword,
        trustedemail: trustEmail, 
        gender: gender,
        email: email,
        password: password,
        birth_date: birthDate
      })
      .then(() => {
        // window.location.href = '/login';
        navigate('/Login')
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          // Si le serveur renvoie une erreur 400, cela signifie que l'utilisateur existe déjà
          setErrors({ email: "A user with the same username or email address already exists." });
        } else {
          // Gestion d'autres erreurs
          setErrors({ general: "Une erreur inattendue s'est produite lors de l'inscription." });
        }
      });

};
const validateEmail2 = (email) => {
  // Utilisez une expression régulière pour vérifier si l'email se termine par '@uni.com'
  const emailRegex = /@gmail\.com$/;
  return emailRegex.test(email);
};
const validateEmail1 = (email) => {
  // Utilisez une expression régulière pour vérifier si l'email se termine par '@uni.com'
  const emailRegex = /@uni\.com$/;
  return emailRegex.test(email);
};
  const validateEmail = (email) => {
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return String(email)
      .toLowerCase()
      .match(regExp);
  };
  const validatePassword = (pwd) => {
    // Expression régulière simple pour une adresse email
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return String(pwd)
      .match(
        regExp
      );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!firstName.trim()) errors.firstName = 'First Name is required';
    else if (firstName.trim().length < 3) errors.firstName = 'Username is too short';

    if (!lastName.trim()) errors.lastName = 'Last Name is required ';
    else if (lastName.trim().length < 3) errors.lastName = 'The name is too short';

    if (!username.trim()) errors.username = 'Username is required';
    else if (username.trim().length < 3) errors.username = 'The Username is too short';

    if (!validatePhoneNumber(phoneNumber)) errors.phoneNumber = 'Please enter a valid phone number.';
    else if (phoneNumber.trim().length < 9) errors.phoneNumber = "The phone number is too short"
    

    if (!gender) {
      errors.gender = 'Gender is required';
    }
    if (!birthDate) {
      errors.birthDate = 'BirthDate is required';
    }

    if (!password.trim()) { errors.password = 'password is required';
  }else if (password.trim().length < 8) { errors.password = 'Your password is too short.Try creating another one !';
 } else if (!validatePassword(password?.trim())) {
      errors.password = "Password must contain at least one uppercase letter, one digit, and be at least 8 characters long";
  }

  
    if (!confirmpassword.trim()) errors.confirmpassword = "Confirmpassword is required"
    else if (confirmpassword.trim() !== password)
      errors.confirmpassword = "Confirmpassword do not match"
   
    if (!email.trim()) errors.email = 'email is required';
    else if (!validateEmail(email.trim())) errors.email = 'Email incorrect';
    else if (!validateEmail1(email.trim())) errors.email = "Adresse e-mail incorrecte. Veuillez vous assurer qu'elle se termine par '@uni.com'";

    if (!trustEmail.trim()) {
      errors.trustEmail = 'Trust Email is required';
    } else if (!validateEmail(trustEmail.trim())) {
      errors.trustEmail = 'Invalid Email !';
    } else if (!validateEmail2(trustEmail.trim())) {
      errors.trustEmail = "Please enter your own @Gmail address."}

    setErrors(errors);

    if (Object.keys(errors).length === 0) Register();
    else return;
  };

  return (
    <div className="pageRegister">
    <div className="left-section">
    <img src='Logo.png' alt="Envelop icon" style={{
            width: '70%',
            height: '50%',
            // marginRight: '20px',
            marginLeft: '-150px',
            marginTop : '-170px',
          }} />
      <img src='profiledata.svg' alt="Illustration" />
    </div>
    <div className="right-section">
      <form onSubmit={onSubmit}>
        <h2>Join us</h2>

        <div className="form-row">
          <div className="form-group">
          <label
              className="block "
              style={{
                // width: '15%',
                fontSize: '16px',
                color:'#395886',
                left:'-30%',
                position:'relative',
                
                  
              }}
              htmlFor="username"
            >
              First Name
            </label>
            <input
          type="text"
          placeholder="First Name"
          onChange={changeFirstName}
          onFocus={handleFirstNameFocus}
          onBlur={handleFirstNameBlur}
          value={firstName}
          style={{
            marginTop:'10px',
            marginBottom: '8px',
            width: '100%',
            borderRadius: '20px',
            borderColor: firstNameFocused ? '#628ECB' : '#628ECB',
            padding: '3px 15px 3px',
            fontSize:'15px',
            background: firstNameFocused ? 'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
          }}
        />
            {errors.firstName && <span className="error"> {errors.firstName} </span>}
          </div>

          <div className="form-group">
          <label
              className="block "
              style={{
                // width: '15%',
                fontSize: '16px',
                color:'#395886',
                left:'-30%',
                position:'relative'
                  
              }}
              htmlFor="username"
            >
              Last Name
            </label>
            <input
          type="text"
          placeholder="Last Name"
          onChange={changeLastname}
          onFocus={handleLastNameFocus}
          onBlur={handleLastNameBlur}
          value={lastName}
          style={{
            marginTop:'10px',
            marginBottom: '8px',
            width: '100%',
            borderRadius: '20px',
            borderColor: lastNameFocused ? '#628ECB' : '#628ECB',
            padding: '3px 15px 3px',
            background: lastNameFocused ?'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
          }}
        />
            {errors.lastName && <span className="error"> {errors.lastName} </span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
          <label
              className="block "
              style={{
                width: '20%',
                fontSize: '16px',
                color:'#395886'

              }}
              htmlFor="username"
            >
              Username
            </label>
            <input
          type="text"
          placeholder="Username"
          onChange={changeUsername}
          onFocus={handleUsernameFocus}
          onBlur={handleUsernameBlur}
          value={username}
          style={{
            marginTop:'10px',
            marginBottom: '8px',
            width: '100%',
            borderRadius: '20px',
            borderColor: usernameFocused ? '#628ECB' : '#628ECB',
            padding: '3px 15px 3px',
            background: usernameFocused ? 'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
          }}
        />
            {errors.username && <span className="error"> {errors.username} </span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
          <label
              className="block "
              style={{
                width: '20%',
                fontSize: '16px',
                color:'#395886'

              }}
              htmlFor="username"
            >
              Phone_Number
            </label>
            <input
          type="tel"
          placeholder="Phone Number"
          onChange={changePhoneNumber}
          onFocus={handlePhoneNumberFocus}
          onBlur={handlePhoneNumberBlur}
          value={phoneNumber}
          style={{
            marginTop:'10px',
            marginBottom: '8px',
            width: '100%',
            borderRadius: '20px',
            borderColor: phoneNumberFocused ? '#628ECB' : '#628ECB',
            padding: '3px 15px 3px',
            background: phoneNumberFocused ? 'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
          }}
        />
            {errors.phoneNumber && <span className="error"> {errors.phoneNumber} </span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ width: '48%', marginRight: '4%' }}>
          <label
              className="block "
              style={{
                width: '15%',
                fontSize: '16px',
                color:'#395886'

              }}
              htmlFor="username"
            >
              Gender
            </label>
            <select
    id="gender"
    value={gender}
    onChange={changeGender}
    style={{
      marginTop:'10px',
      marginBottom: '8px',
      width: '100%',
      borderRadius: '20px',
      padding: '3px 15px 3px 15px',
      background: gender ? 'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
      fontSize: '13px',
      display: 'block', // Toujours visible par défaut
      cursor: 'pointer',
    }}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
  <span
    onClick={toggleDropdown}
    style={{
      position: 'absolute',
      right: '260px',
      top: '46%',
      transform: 'translateY(-50%)',
      color: '#395886',
      cursor: 'pointer',
    }}
  >
    &#9660;
  </span>


            {errors.gender && <span className="error"> {errors.gender} </span>}
          </div>

          <div className="form-group" style={{ width: '48%' }}>
          <label
              className="block "
              style={{
                width: '15%',
                fontSize: '16px',
                color:'#395886'

              }}
              htmlFor="username"
            >
              Birthday
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={birthDate}
              onChange={changeBirthDate}
          onFocus={handleBirthDateFocus}
          onBlur={handleBirthDateBlur}
              // onChange={changeBirthDate}
              min="1900-01-01"
              max={new Date().toISOString().split('T')[0]}
              style={{
                marginTop:'10px',
                marginBottom: '8px',
                width: '100%',
                borderRadius: '20px',
                borderColor: birthDate ? '#628ECB' : '#628ECB',
                padding: '3px 15px 3px 15px',
                background: birthDate ?'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
                fontSize: '13px',
              }}
            />
            {errors.birthDate && <span className="error"> {errors.birthDate} </span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
          <label
              className="block "
              style={{
                width: '15%',
                fontSize: '16px',
                color:'#395886'

              }}
              htmlFor="username"
            >
              Email
            </label>
          <input
            type="text"
            placeholder="Email Address"
            onChange={changeEmail}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            value={email}
            style={{
              marginTop:'10px',
              marginBottom: '8px',
              width: '100%',
              borderRadius: '20px',
              borderColor: emailFocused ? '#628ECB' : '#628ECB',
              padding: '3px 15px 3px',
              background: emailFocused ? 'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
            }}
          />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>&& <span className="error"> {errors.email} </span>}
                {formErrors.email && <span className="error"> {formErrors.email} </span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
          <label
              className="block "
              style={{
                width: '15%',
                fontSize: '16px',
                color:'#395886'

              }}
              htmlFor="username"
            >
              Trust_Email
              
            </label>  
            <input
          type="email"
          placeholder="Trust Email"
          onChange={changeTrustEmail}
          onFocus={handleTrustEmailFocus}
          onBlur={handleTrustEmailBlur}
          value={trustEmail}
          style={{
            marginTop:'10px',
            marginBottom: '8px',
            width: '100%',
            borderRadius: '20px',
            borderColor: trustEmailFocused ? '#628ECB' : '#628ECB',
            padding: '3px 15px 3px',
            background: trustEmailFocused ? 'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
          }}
        />
            {errors.trustEmail && <span className="error">{errors.trustEmail}</span>}
            <p style={{ fontSize: '14px', color: '#6B6B6B', marginTop: '5px' }}>
      Veuillez fournir votre propre adresse Gmail pour récupérer votre mot de passe en cas de perte.
    </p>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
          <label
              className="block "
              style={{
                width: '15%',
                fontSize: '16px',
                color:'#395886'

              }}
              htmlFor="username"
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
            marginTop:'10px',
            marginBottom: '8px',
            width: '100%',
            borderRadius: '20px',
            background: passwordFocused ?  'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
            padding: '3px 15px 3px',
          }}
        />

              {errors.password && <p className="text-red-500">{errors.password}</p>}

          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
          <label
              className="block "
              style={{
                width: '15%',
                fontSize: '16px',
                color:'#395886'

              }}
              htmlFor="username"
            >
              Confirm_Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={changeConfirmPassword}
              onFocus={handleConfirmPasswordFocus}
          onBlur={handleConfirmPasswordBlur}
              value={confirmpassword}
              style={{
                marginTop:'10px',
                marginBottom: '8px',
                width: '100%',
                borderRadius: '20px',
                background: confirmpasswordFocused ?  'white' : 'linear-gradient(90deg, #5982bb, #ffffff)',
                padding: '3px 15px 3px',
              }}
            />
            {/* {errors.confirmpassword && (<span className="error text-red-500"> {errors.confirmpassword} </span>)} */}
            {/* //  {errors.confirmpassword && <p className="text-red-500">{errors.confirmpassword}</p>} */}
            {errors.confirmpassword && <p style={{ color: 'red' }}>{errors.confirmpassword}</p>&& <span className="error"> {errors.confirmpassword } </span>}
            
          </div>
        </div>

        <div className="clickable">
          <button id="sub_btn" type="submit">
            Register
          </button>
          <h4>
            Already a member? <Link to="/Login">Sign in now</Link>
          </h4>
        </div>
      </form>
    </div>
    <style>
    {`
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* background-image: url(./images/profiles/p); */
}

.pageRegister {
  display: flex;
  background-color: #d5deef;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.left-section {
  flex: 1;
  padding: 80px;
  box-sizing: border-box;
}

.left-section img {
  width: 90%;
  height: 90%;
  margin-left:10%;
  margin-top: -130px;
}

/* .form-group input,
.form-group select, */
/* .form-group textarea {
  margin-top: 0;
  margin-bottom: 8px;
  padding: 8px 15px; 
  width: 100%;
  border-radius: 20px;
  border-color: #628ECB;
} */
select , input[type="gender"] {
  
  margin-top: 0;
  margin-bottom: 8px;
  padding: 8px 15px; 
  width: 100%;
  border-radius: 20px;
  border-color: #628ECB;

}
input[type="text"] {
  
  margin-top: 0;
  margin-bottom: 8px;
  padding: 8px 15px; 
  width: 100%;
  border-radius: 20px;
  border-color: #628ECB;

}
.right-section {
  flex: 1;
  padding: 20px;
  padding-bottom: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: #d5deef;
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 80px;
}

.right-section h2 {
  font-family: 'Times New Roman', Times, serif;
  color: #395886;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.form-row .form-group {
  flex: 1;
}

.form-group select {
  width: 100%;
}
.form-group input{
  width:100%;
}
.form-group:last-child {
  margin-bottom: 0;
}


.form-group .input::placeholder,
.form-group .select::placeholder,
.form-group .textarea::placeholder {
  font-size: 13px;
  color: #628ECB;
  padding: 8px 15px; 
}

.error {
  color: red;
  font-size: 12px;
}
.clickable{
  margin-top:25px;
}
.clickable button {
  background-color: #395886;
  border: none;
  color: white;
  padding: 5px 40px 5px;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition-duration: 0.4s;
  border-radius: 20px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.clickable h4 {
  font-size: 15px;
}

.clickable a {
  font-size: 15px;
  color: #395886;
  text-decoration: none;
}

.clickable a:hover {
  text-decoration: underline;
}
`}
    </style>
  </div>
  );
}

export default Register;
