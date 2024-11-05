import React, { useEffect } from "react";
import logo from "../ReplyPal.svg";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import LeftmostMenu from "../components/LeftmostMenu";
import { IconContext } from "react-icons";
import DropDownMenu from "../components/DropDownMenu";
import ContactsMenu from "../components/ContactsMenu";

function ContactsLayout() {

  const getProfile = (id) => {
    const instance = axios.create({
      withCredentials: true
    });

    instance.get(`${process.env.REACT_APP_API_LINK}users/get-user`)
      .then(function (res) {
        console.log(res.data)
        localStorage["user_id"] = res.data._id
        localStorage["email"] = res.data.email
      }).catch((error) => {
        console.log(error)
      })
  }

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

      <div clas="w-full bg-transparent" >
        <div>
          <div class=" flex bg-white">
            <div class="col w-1/6">
              <img class="w-full" src={logo} className="p-3 logo" />
            </div>
            <div class=" col w-4/6 pt-1">
              <input
                class="my-2 w-full shadow appearance-none border border-slate-400 rounded py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline bg-slate-50"
                id="password"
                type="Text"
                placeholder="Rechercher un contact"
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
            <div class="bg-white w-80 flex flex-row justify-between col-span-8">

            <LeftmostMenu />

              <div>

                <ContactsMenu />

              </div>
            </div>
            <div class="flex-1 flex flex-col overflow-hidden col-span-8">
              <main class="flex-1 bg-white border">
                <div class="container mx-auto p-2">
                  <Outlet />
                </div>
              </main>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default ContactsLayout;
