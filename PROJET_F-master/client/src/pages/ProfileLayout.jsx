import React, { useEffect,useState } from "react";
import logo from "../logo3.svg";

import { Navigate,Outlet, Link } from "react-router-dom";
import axios from 'axios';
import DropDownMenu from '../components/DropDownMenu';
import LeftmostMenu from "../components/LeftmostMenu";
import ProfileMenu from "../components/ProfileMenu";


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

function ProfileLayout() {
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
    <div class="app" >

    <div clas="w-full bg-white" >
      {/* <div className='mainHeader'style={{ backgroundColor:'white',position: 'fixed', top: 0, zIndex:'99999999999999'}}> */}
        <div class=" flex "style={{ backgroundColor:'',}} >
        <div class="col w-1/6">
        <div style={{ position: 'fixed' }}>
      <p className='unicom' style={{ fontWeight: 'bold', color: '#628ecb', marginLeft: '76px', marginTop:'2px', fontSize: '30px' }}>
        UniCom
      </p>

      <img class="w-full" src={logo} className="p-3 logo" style={{ width: '110px', height: 'auto' , marginTop:'-75px', marginLeft: '-20px' }} />
    </div>
            </div>
          {/* <div class=" col w-4/6 pt-1" style={{ backgroundColor:'white', marginTop:'20px',marginLeft: '120px',}}> */}
            {/* <input
              class="my-2 w-full shadow appearance-none border border-slate-400 rounded py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline bg-slate-50"
              id="password"
              type="Text"
              placeholder="search for contact.."
            >
            </input> */}
          {/* </div> */}
          <div class=" bg-white flex flex-col float-right ml-auto">
              <DropDownMenu />
            </div>  
        </div>
      {/* </div> */}
      <IconContext.Provider value={{ className: "icon-size text-gray-800" }}>
 <div class="flex h-screen bg-gray-200 home-nav-remove">
   <div class="bg-white w-80 flex flex-row justify-between col-span-8">
          <LeftmostMenu />
           <div>
              <ProfileMenu />
            </div>

            
          </div>


          {/* <div  class="flex-1 flex flex-col  col-span-8"> */}
          <div className="flex-1 flex flex-col col-span-9" style={{ marginTop: '-60px', backgroundColor: 'bg-slate-100', borderRadius: '8px' }}>

<main class="flex-1 bg-white border mt-10" >


    <div class="container mx-auto p-2 ">
      
      <Outlet />
    </div>
  </main>
</div>
</div>
</IconContext.Provider>
</div>
<style>
{`
.mainHeader{
position:fixed;
top:0;
right:0;
left:0;
width:100vw;
height:15px;
background-color:white;
}
input{
height:6vh;
width:100;
padding-left:5px;
}


#main{
margin-top: 10%; 
height: 10vh;
bottom:0;
}
input[type="text"] {

margin-top: 0;
margin-bottom: 8px;
padding: 8px 15px; 
width: 100%;
border-radius: 20px;
border-color: #628ECB;

}
`
}
</style>
</div>
);
}


export default ProfileLayout;

