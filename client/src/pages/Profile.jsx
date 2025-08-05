

// export default Profile;
import { useState, React, useEffect ,useRef} from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import {BiImageAdd} from 'react-icons/bi'
import { Alert, Snackbar, Stack } from "@mui/material";

function Profile() {
    const [snackbarKey, setSnackbarKey] = useState(0);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const { userId } = useParams();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [avatar,setAvatar]=useState(null)
    const [previewUrl,setPreviewUrl]=useState('')
    const [openSnack, setOpenSnack] = useState(false);
    const inp=useRef()
    const MINIMUM_AGE = 18;
    const [trustedEmailError, setTrustedEmailError] = useState("");
    
    const resetSnackbar = () => {
        setSnackbarKey(0);
        setSnackbarSeverity("success");
        setSnackbarMessage("");
    };
    const validatePhoneNumber = (number) => {
        const algerianNumberRegex = /^(0)(5|6|7)\d{8}$/;
        return algerianNumberRegex.test(number);
    };
    useEffect(() => {
        // Resetting the snackbarKey after it's used to clear the Snackbar
        setSnackbarKey(0);
    }, [snackbarKey]);
    
    

    // Mettre à jour les champs de la page
    const onFormChange = (e) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };
    
        if (name === "trustedemail") {
            if (!value.trim()) {
              setFormErrors({ ...formErrors, trustedemail: "Veuillez fournir un e-mail de confiance" });
            } else if (!validateEmail(value.trim())) {
              setFormErrors({ ...formErrors, trustedemail: "E-mail de confiance incorrect" });
            } else {
              setFormErrors({ ...formErrors, trustedemail: "" });
            }
          }
        if (name === "birthDate") {
            // Calculate age based on the entered birthdate
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
    
            // Adjust age based on the birthdate in the current year
            if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
                updatedFormData = { ...updatedFormData, age: age - 1 };
            } else {
                updatedFormData = { ...updatedFormData, age };
            }
    
            // Validate age against the minimum age
            if (age < MINIMUM_AGE) {
                setFormErrors({ ...formErrors, birthDate: "Must be at least 18 years old." });
            } else {
                setFormErrors({ ...formErrors, birthDate: null });
            }
        }
    
        if (name === "phoneNumber") {
        const inputNumber = value.replace(/\D/g, '');

        if (inputNumber.length !== 10 || !validatePhoneNumber(inputNumber)) {
            setFormErrors({
                ...formErrors,
                phoneNumber: 'Please enter a valid phone number.',
            });
        } else {
            setFormErrors({ ...formErrors, phoneNumber: '' });
        }
    }

    setFormData(updatedFormData);
};
    // console.log('nhujd',formData)
    const Update = () => {
        const instance = axios.create({
            withCredentials: true
        });
        
        let body = {
            username: formData.username,
            phone_number: formData.phoneNumber,
            first_name: formData.first_name,
            last_name: formData.last_name,
            gender: formData.gender,
            birth_date: formData.birthDate,
            password: formData.password,
            trustedemail: formData.trustedemail,
    

        };

        instance.put(`${process.env.REACT_APP_API_LINK}users/${localStorage["user_id"]}`, body,)
            .then(function (res) {
                // setTimeout(() => {
                //     window.location.reload();
                // }, 3000);
                
                
                setFormData({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    username: res.data.username,
                    gender: res.data.gender,
                    phone_number: res.data.phone_number,
                    birth_date: res.data.birth_date.substring(0, 10),
                    email: res.data.email,
                    trustedemail: res.data.trustedemail,

                    //profile_picture: res.data.profile_picture
                    
                });
                setAvatar('');

                setOpenSnack(true); // Open Snackbar on success
                setSnackbarSeverity("success");
                setSnackbarMessage("Mis à jour avec succès");

                
              
            })
            .catch(function (error) {
                // Handle error cases
                console.log(error);
                setOpenSnack(true);
                if (error.response) {
                    // Handle specific error cases
                    if (error.response.status === 400 && error.response.data.message === "Username already exists") {
                        setFormErrors({ ...formErrors, username: "Username already exists" });
                        setSnackbarSeverity("error");
                        setSnackbarMessage("Username already exists");
                    } else {
                        // Handle other errors
                        setSnackbarSeverity("error");
                        setSnackbarMessage("Erreur lors de la mise à jour");
                    }
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
            });
    
           
    }

    // Récupérer le profile utilisateur grace à l'identifiant Mongodb
    const getProfile = () => {

        const instance = axios.create({
            withCredentials: true
        });

        instance.get(`${process.env.REACT_APP_API_LINK}users/get-user`)
            .then(function (res) {
                
                setFormData({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    username: res.data.username,
                    gender: res.data.gender,
                    phoneNumber: res.data.phone_number,
                    birthDate: res.data.birth_date?.substring(0, 10),
                    email: res.data.email,
                    avatar: res.data.avatar,
                    trustedemail: res.data.trustedemail,
                })
                if(res.data.avatar){
                    setPreviewUrl(`${process.env.REACT_APP_API_LINK}avatars/${res.data.avatar}`)
                }
            })
    }
 // Expression régulière simple pour une adresse email
 const validateEmail = (email) => {
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return String(email)
      .toLowerCase()
      .match(regExp);
  };
  const validateEmail2 = (email) => {
    // Utilisez une expression régulière pour vérifier si l'email se termine par '@uni.com'
    const emailRegex = /@gmail\.com$/;
    return emailRegex.test(email);
  };
  


    const onSubmit = (e) => {
        e.preventDefault();
        const errors = {}

//////////



        if (formData.phoneNumber) {
            const inputNumber = formData.phoneNumber.replace(/\D/g, '');
    
            if (inputNumber.length !== 10 || !validatePhoneNumber(inputNumber)) {
                errors.phoneNumber = 'Veuillez entrer un numéro de téléphone valide';
            }
        }
////////////
        // Validation du nom utilisateur
        if (!formData.first_name.trim())
        errors.first_name = "Please provide a first name"
        else if (formData.first_name.trim().length < 3)
            errors.first_name = "First name is too short"
        
        

        if (!formData.last_name.trim())
            errors.last_name = "Please provide last name"
        else if (formData.last_name.trim().length < 3)
            errors.last_name = "Last name too short"

        if (!formData.username.trim())
            errors.username = "Please provide username"
        else if (formData.username.trim().length < 3)
            errors.username = "Username is too short"

            if (!formData.trustedemail.trim()) errors.trustedemail = "Trust Email is required";
            else if (!validateEmail(formData.trustedemail.trim())) errors.trustedemail = "Invalid Email !";
            else if (!validateEmail2(formData.trustedemail.trim())) errors.trustedemail = "Please enter your own @Gmail address !";
       ////////////

            if (formData.birthDate === null) {
                errors.birthDate = "Veuillez fournir une date de naissance";
            } else {
                // Validation de l'âge par rapport à l'âge minimum
                const birthDate = new Date(formData.birthDate);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
        
                if (age < MINIMUM_AGE) {
                    errors.birthDate = "Must be at least 18 years old.";
                }
            }
            ///////

        // Enregistrer les erreurs
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            Update();
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    const uploadImage = (image)=>{
        const file = image.target.files[0]
       
         setAvatar(file)
       
         if (file) {
           const reader = new FileReader();
           reader.onloadend = () => {
             setPreviewUrl(reader.result);
           };
           reader.readAsDataURL(file);
         }
       
         }


         useEffect(() => {
            const instance = axios.create({
                withCredentials: true
            });
            if(avatar || avatar ==""){
        

                instance.put(`${process.env.REACT_APP_API_LINK}users/avatar/${localStorage["user_id"]}`,{avatar},{ headers: {
                    "Content-Type": "multipart/form-data", 
                  }}).then(()=>setOpenSnack(true)).catch((err)=>console.log('err',err))

            }
         }, [avatar])
         

    if (!formData) return <p>Chargement en cours</p>

    return (
        <>   <div className="flex justify-center items-center h-screen mt-56 text-left bg-white">
                {/* <div className="flex flex-col justify-start items-center">
            <div className={`${previewUrl ? ' w-[250px] h-[250px] border-black border relative': "border-2 w-[250px] h-[250px]  hover:bg-gray-600 hover:bg-opacity-40 border-black"} rounded-full cursor-pointer flex items-center justify-center  border-black my-5 `} onClick={()=>inp.current ? inp?.current?.click() : ""}>
       {previewUrl ? <img src={ previewUrl } alt="preview" className=' rounded-full w-full h-full hover:opacity-50 '/>: <BiImageAdd className="  text-2xl "/> }
      
       </div>
       {previewUrl && <button className="bg-red-600" onClick={()=>{
        setAvatar("")
        setPreviewUrl('')
       }}>supprimer</button>}
       </div> */}

                <div class="w-1/2 basis ">
                    
                <form className="bg-gray-100 rounded-[20px] px-8 pb-8 mb-4 mx-auto pt-10" style={{ marginTop: '100px' }} onSubmit={onSubmit}>
                    <div className="flex flex-col justify-start items-center"> 
            <div className={`${previewUrl ? ' w-[250px] h-[250px] border-black border relative': "border-2 w-[250px] h-[250px]  hover:bg-gray-600 hover:bg-opacity-40 border-black"} rounded-full cursor-pointer flex items-center justify-center  border-black my-5 `} onClick={()=>inp.current ? inp?.current?.click() : ""}>
       {previewUrl ? <img src={ previewUrl } alt="preview"id='photo' className=' rounded-full w-full h-full hover:opacity-50 '/>: <BiImageAdd className="  text-2xl "/> }
      
       </div>
       {previewUrl && <button className="bg-red-600" onClick={()=>{
        setAvatar("")
        setPreviewUrl('')
       }}>Delete</button>}
       </div> 
                          <h1 className="my-2 text-2xl font-bold text-blue-500 mx-auto ml-auto">Personal information</h1>
                        <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="username"
                            >
                                Firstname
                            </label>
                            <input
                                class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="Firstname"
                                value={formData.first_name}
                                onChange={onFormChange}

                            ></input>
                            {formErrors.first_name && <span class="text-red-600"> {formErrors.first_name} </span>}
                        </div>
                        <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="username"
                            >
                                Lastname
                            </label>

                            <input
                                class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Lastname"
                                value={formData.last_name}
                                onChange={onFormChange}
                            ></input>
                            {formErrors.last_name && <span class="text-red-600"> {formErrors.last_name} </span>}
                        </div>
                        <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="username"
                            >
                                Username
                            </label>
                            <input
                                class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Nom"
                                value={formData.username}
                                onChange={onFormChange}

                            ></input>
                            {formErrors.username && <span class="text-red-600"> {formErrors.username} </span>}
                        </div>
                        <div class="mb-3">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="birth_date"
                            >
                            
                                Birthdate
                            </label>
                            <input
                                class="shadow appearance-none border  rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="birth_date"
                                name="birthDate"
                                type="date"
                                value={formData.birthDate}
                                placeholder="Ex: 2024:01:01"
                                onChange={onFormChange}
                            ></input>
                            {formErrors.birthDate && <span class="text-red-600"> {formErrors.birthDate} </span>}
                        </div>
                        <div class="mb-3">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="email"
                            >
                                Email address
                            </label>
                            <input
                                class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                placeholder="nom@nomsociete.tld"
                                onChange={onFormChange}
                                readOnly
                            ></input>
                            {formErrors.email && <span class="text-red-600"> {formErrors.email} </span>}
                        </div>
                        <div class="mb-3">
                        <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="trustedemail"
              >
        Trust Email
           </label>
              <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="trustedemail"
               name="trustedemail"
               type="text"
               value={formData.trustedemail}
                placeholder="Trust Email"
                onChange={onFormChange}
               ></input>
               {formErrors.trustedemail  && <span class="text-red-600">{formErrors.trustedemail}</span>}
                 </div>
                 <div class="mb-3">
  <label
    class="block text-gray-700 text-sm font-bold mb-2"
    for="phone_number"
  >
    Phone number
  </label>
  <input
    class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="phoneNumber"
    name="phoneNumber"
    type="text"
    value={formData.phoneNumber}
    placeholder="Phone number"
    onChange={onFormChange}
  ></input>

  {formErrors.phoneNumber && (
    <span class="text-red-600">{formErrors.phoneNumber}</span>
  )}

<input type='file'  hidden ref={inp} onChange={(e)=>uploadImage(e)} />
</div>
                        <div class=" flex justify-center items-center">
                            <button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Update infos
                            </button>
        
                        </div>
                        
                    </form>
                    <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnack}
                    autoHideDuration={5000}
                    onClose={() => {
                        setOpenSnack(false);
                        resetSnackbar(); // Reset Snackbar state variables
                    }}
                >
                    <Alert
                        onClose={() => {
                            setOpenSnack(false);
                            resetSnackbar(); // Reset Snackbar state variables
                        }}
                        severity={snackbarSeverity}
                        sx={{ width: "100%" }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Stack>
                    
          
                </div>
            </div>
            <style>
        {`
    #photo{
        z-Index:23;
    }
         `
        }
      </style>
        </>
    );
}


export default Profile;

