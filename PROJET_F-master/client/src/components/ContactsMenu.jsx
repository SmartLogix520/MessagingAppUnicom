import React from "react";
import logo from "../ReplyPal.svg";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import DropDownMenu from './DropDownMenu'

import {
FaUsers, FaPlus
} from "react-icons/fa";

import { IconContext } from "react-icons";

function EmailMenu() {
    if (!localStorage["email"]) return ("Unauthorized")
    return (
        <div class="px-0">
            <a href="/compose" className=" hover:bg-slate-200 text-white font-bold py-3 px-4 rounded bg-gray-100 bg-btn-messenger mx-4 block">
                Add contact     <FaPlus className="float-left font-bold mx-1 text-white" />
            </a>
            <ul class="mt-8 text-start w-full">
                <li class="relative px-6 py-2">
                    <a href="/inbox">
                        <span class="text-gray-800 text-small">
                            <FaUsers className="float-left mx-2 font-bold" /> Contacts
                        </span>
                    </a>
                </li>
                <li class="relative px-6 py-2">
                    <a href="/inbox">
                        <span class="text-gray-800 text-small">
                            <FaPlus className="float-left mx-2 font-bold" /> Add new contact
                        </span>
                    </a>
                </li>
            </ul>
            <hr className="mt-4" />
        </div>
    );
}

export default EmailMenu;
