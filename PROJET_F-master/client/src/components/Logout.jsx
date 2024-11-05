import React, { useEffect } from "react";
import logo from "../ReplyPal.svg";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';

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
    FaHome,
    FaSignOutAlt
} from "react-icons/fa";

import { IconContext } from "react-icons";

function Logout() {
    const logout = async () => {
        const _response = await axios({
            method: 'post',
            url: `http://localhost:5000/auth/logout`,
            withCredentials: true
        }).then((res) => {
            // Sauvegarder les données de connexion
            localStorage.removeItem("email");
            localStorage.removeItem("user_id");
            localStorage.removeItem("msg_receiver");
            localStorage.removeItem("conversation_id");
            localStorage["isFriendClicked"] = false;
            console.log(res);
            window.location.href = "/register"
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <a onClick={() => logout()} tabindex="3" class="text-gray-700 flex w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" ><FaSignOutAlt size={18} className="mr-3"></FaSignOutAlt> Sign out</a>
    );
}

export default Logout;

