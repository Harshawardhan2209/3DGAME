import React from 'react';
import {LOGO_URL} from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [btnName, setBtnName] = useState('Login');

    return (<div className="flex justify-between shadow_lg bg-red-700 rounded border-r-4 space-x-4 text-white">
        <div className="flex items-center">
            <img className="w-24 p-2 items-center rounded-xl" src={LOGO_URL}></img>
        </div>
        <div className='flex items-center ms-40'>
            <ul className="flex items-center text-xl space-x-5">
                <li className="px-4">
                    <h5><Link to="/">Home</Link></h5>
                </li>
                <li className="px-4">
                    <h5><Link to="/about">About</Link></h5>
                </li>
                <li className="px-4">
                    <h5><Link to="/contact">Contact Us</Link></h5>
                </li>
                <li><h5>Cart</h5></li>
                <button className='px-4' onClick={() => {
                    btnName === "Login" ?
                    setBtnName('Logout') : setBtnName('Login');
                }}>{btnName}</button>
            </ul>
        </div>
    </div>
    );
};

export default Header;