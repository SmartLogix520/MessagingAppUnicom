import { useState, React, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import welcome from "../email-welcome.svg"

function ProfileHome() {
    const { userId } = useParams();
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    // Mettre à jour les champs de la page
    const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

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
            password: formData.password
        };

        instance.put(`${process.env.REACT_APP_API_LINK}users/${localStorage["user_id"]}`, body)
            .then(function (res) {
                setFormData({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    username: res.data.username,
                    gender: res.data.gender,
                    phone_number: res.data.phone_number,
                    birth_date: res.data.birth_date.substring(0, 10),
                    email: res.data.email
                    //profile_picture: res.data.profile_picture
                })
            
            }
            )
            .catch(function (error) {
                console.log(error)
            });
            window.location.href = "/profile/update-profile"
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
                    profile_picture: res.data.profile_picture
                })
            })
    }

    const validateEmail = (email) => {
        // Expression régulière simple pour une adresse email
        const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return String(email)
            .toLowerCase()
            .match(
                regExp
            );
    };


    const onSubmit = (e) => {
        e.preventDefault();
        const errors = {}
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
            errors.username = "Please provide username"

        if (!formData.email.trim())
            errors.email = "Veuillez renseigner votre email"
        else if (!validateEmail(formData.email.trim()))
            errors.email = "Email incorrect"

        if (formData.birthDate === null)
            errors.birthDate = "VPlease provide birthdatee"

        // Enregistrer les erreurs
        setFormErrors(errors);

        if (Object.keys(formErrors).length === 0)
            Update()

    }

    useEffect(() => {
        getProfile()
    }, [])

    if (!formData) return <p>Chargement en cours</p>

    return (
        <>
            <div class="flex justify-center items-center h-screen bg-white">
                <div class="w-1/2 basis ">
                 
                    <form class="bg-white rounded px-8 pb-8 mb-4 mx-auto pt-10" onSubmit={onSubmit}>
                        <h1 class="my-2 text-4xl font-bold text-blue-500">Welcome {formData.first_name},{formData.last_name}!</h1>
                        {/* <div class="mb-4">
                            <p>{formData.first_name}, {formData.last_name}</p>
                        </div> */}
                        <div class="mb-4">
                            
                           
                           
                        </div>
                        <img src={welcome} width={700} className="mb-20"/>
                        
                    
                    </form>
                </div>
            </div>
             
           
        </>
    );
}

export default ProfileHome;
