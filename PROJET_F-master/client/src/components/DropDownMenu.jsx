// import React, { useEffect } from "react";
import logo from "../Logo1.svg";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import React, { useEffect,useState } from "react";
//
import {
    FaEnvelope,
    FaMailBulk,
    FaArrowCircleRight,
    FaTrash,
    FaComments,
    FaAddressBook,
    FaPlus,
    FaSave,
    FaUser,
    FaUserAlt,
    FaLock,
    FaHome
} from "react-icons/fa";

import { IconContext } from "react-icons";
import Logout from "../components/Logout";

function DropDownMenu() {
    const [previewUrl,setPreviewUrl]=useState('')

  const getProfile = (id) => {
    const instance = axios.create({
      withCredentials: true
    });
  
    instance.get(`${process.env.REACT_APP_API_LINK}users/get-user`)
      .then(function (res) {
        if (res.data.avatar) {
          setPreviewUrl(`http://localhost:5000/avatars/${res.data.avatar}`);
        } else {
          setPreviewUrl('');
        }
        localStorage["user_id"] = res.data._id;
        localStorage["email"] = res.data.email;
      })
      .catch((error) => {
        console.log(error);
      });
  }
const instance = axios.create({
  withCredentials: true
});


    const logout = async () => {
        const _response = await axios({
            method: 'post',
            url: `http://localhost:5000/auth/logout`,
            withCredentials: true
        }).then((res) => {
            // Sauvegarder les données de connexion
            localStorage.removeItem("email");
            localStorage.removeItem("user_id")
            console.log(res);
            window.location.href = "/register"
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        getProfile()
       }, [])
    return (
      
        <div class="flex items-center justify-center zindex-99999 float-right">
        <div class=" relative inline-block text-left dropdown  float-right">
          <span class="rounded-md shadow-sm"
          >
            <a href="#" class="text-slate-700 text-4xl p-1 mt-0 float-right" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
          
            <a href="#" class="text-slate-700 text-4xl p-1 mt-0 float-right" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
{previewUrl ? (
 <div
 style={{
   width: "55px", 
   height: "55px", 
   overflow: "hidden",
   borderRadius: "50%",
   marginRight: '0vw',
   Color:'transparent',
   marginTop:'-0.5vw',
 }}
>
 <img
   width="55px"
   height="55px"
   style={{ objectFit: "cover", width: "100%", height: "100%" }}
   src={previewUrl}
   className="float-left font-bold rounded-full bg-slate-200"
   alt="Profile"
 />
</div>





) : (
<FaUserAlt className="float-left mx-2 font-bold rounded-full bg-slate-200 p-1 rounded-circle text-slate-700 text-4xl" />
)}
</a>
            
            </a>
          </span>
          <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95 mr-20">
            <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
              <div class="px-4 py-3">
                <p class="text-sm leading-5">Signed in as</p>
                <p class="text-sm font-medium leading-5 text-gray-900 truncate">{localStorage["email"]}</p>
              </div>
              <div class="py-1">
              <a href="/profile/" tabindex="0" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Profile</a>
                <a href={`/profile/update-profile`} tabindex="0" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Update informations</a>
                {/* <a href="/profile/add-account" tabindex="1" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Add account</a> */}
                </div>
              <div class="py-1">
                <a onClick={() => logout()} tabindex="3" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Sign out</a></div>
            </div>
          </div>
        </div>
        <style>
  {`
   
  `}
</style>

      </div>
    );
}

export default DropDownMenu;

