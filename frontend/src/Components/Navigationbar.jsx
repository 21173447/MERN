import React, { useState } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Navigationbar = () => {
    const [dark, setDark] = useState(false);


    const toggleDarkMode = () => {
        setDark(!dark);
        document.documentElement.classList.toggle("dark");
    }

    return (
        <div className='flex justify-between items-cente last:r dark:bg-blue-900 px-10 pt-10'>
            <ul className='flex items-center space-x-1 text-2xl'>
                <h1 className='text-3xl  font-bold text-blue-500 dark:text-blue-300'>PRODUCT STORE</h1>
                <FaShoppingCart className='transform scale-x-[-1]' />
            </ul >

            <div className='dark:text-gray-200 text-3xl flex '>
                <button className='flex' onClick={toggleDarkMode}>
                    {dark ? <IoSunnyOutline />
                        : <FaRegMoon />}
                </button>


                <Link to="/create">
                    <CiSquarePlus />
                </Link>
            </div>

        </div>
    );
}

export default Navigationbar;
