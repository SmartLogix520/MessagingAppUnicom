import React from "react";
import logo from "../logo3.svg";
import { Outlet, Link } from "react-router-dom";
import DropDownMenu from "../components/DropDownMenu";

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
  FaUserAlt
} from "react-icons/fa";

import { IconContext } from "react-icons";
import MessengerMenu from "../components/MessengerMenu";
import LeftmostMenu from "../components/LeftmostMenu";

function MessengerLayout() {
  if (!localStorage["email"]) return ("Unauthorized")
  return (
    <div class="app" >

      <div clas="w-full bg-transparent" >
        <div className='mainHeader'>
          <div class=" flex bg-white">
            <div class="col w-1/6">
            <div style={{ position: 'fixed' }}>
              <img class="w-full" src={logo} className="p-3 logo"style={{ width: '110px', height: 'auto' ,marginTop:'-30px', marginLeft: '-20px'}} />
              <p className='unicom' style={{ fontWeight: 'bold', color: '#628ecb', marginLeft: '60px', marginTop:'-75px',fontSize: '30px' }}>UniCom</p>
              </div>
              </div>
            
            <div class=" col w-4/6 pt-1">
              <input
                class="my-2 w-full shadow appearance-none border border-slate-400 rounded py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline bg-slate-50"
                id="password"
                type="Text"
                placeholder="🔍 Search for a contact.."
              >
              </input>
            </div>
            <div class=" bg-white flex flex-col float-right ml-auto">
              <DropDownMenu />
            </div>
          </div>
        </div>
        <IconContext.Provider value={{ className: "icon-size text-gray-800" }}>
          <div class="flex h-screen bg-gray-200 home-nav-remove">
            <div class="bg-white w-20 flex flex-row justify-between col-span-8">
            <LeftmostMenu />
              
            </div>
            <div class="flex-1 flex flex-col overflow-hidden col-span-8">
              <main id='main' class="flex-1 bg-white border">
                <div class="">
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
          position:sticky;
          top:0;
          right:0;
          left:0;
          background-color:white;
        }
        input{
          height:6vh;
          width:100;
          padding-left:5px;
        }
        .unicom{
          font-weight:bold;
          color:#628ecb;
          margin-left:-22px;
          font-size:24px;
          margin-top:-8vh;
        }
       
        input::placeholder{
          color:#628ECB !important;
          font-size:14px;
        }
     
      
        }
     

        }
        `}
      </style>
    </div>
  );
}

export default MessengerLayout;
