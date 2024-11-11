import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaUsers, FaProductHunt, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    };

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('userId');  
        setUserId(id);
    }, []);

    const navItems = [
        { id: 1, text: 'Users', path: `/users`, icon: <FaUsers /> },
        { id: 2, text: 'Products', path: '/products', icon: <FaProductHunt /> },
        { id: 3, text: 'Orders', path: '/orders', icon: <FaShoppingCart /> },
        { id: 6, text: 'Profil', path: `/users/${userId}`, icon: <FaUserCircle /> },
    ];

    return (
        <div className='bg-black flex justify-between items-center h-24 mx-auto px-4 text-white fixed top-0 left-0 w-full'>
            <h1 className='w-full text-3xl font-bold text-w'>Gouteko</h1>
            <ul className='hidden md:flex'>
                {navItems.map(item => (
                    <li
                        key={item.id}
                        className='p-4 hover:bg-blue-700 rounded-xl m-2 cursor-pointer duration-300 hover:text-black flex items-center'
                    >
                        <Link to={item.path} className="flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.text}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <ul className={nav ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'}>
                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>
                {navItems.map(item => (
                    <li
                        key={item.id}
                        className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600 flex items-center'
                    >
                        <Link to={item.path} className="flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.text}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;
