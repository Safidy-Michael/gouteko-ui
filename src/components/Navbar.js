import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaUsers, FaProductHunt, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUserId(id);
  }, []);

  const navItems = [
    { id: 1, text: 'Users', path: `/users`, icon: <FaUsers /> },
    { id: 2, text: 'Products', path: '/products', icon: <FaProductHunt /> },
    { id: 3, text: 'Orders', path: '/orders', icon: <FaShoppingCart /> },
    { id: 4, text: 'Profile', path: `/users/${userId}`, icon: <FaUserCircle /> },
  ];

  return (
    <nav className="bg-black fixed top-0 left-0 w-full h-24 flex items-center justify-between px-6 text-white z-50 shadow-md">
      <h1 className="text-3xl font-bold text-[#00df9a] cursor-default select-none">Gouteko</h1>

      <ul className="hidden md:flex space-x-6">
        {navItems.map(({ id, text, path, icon }) => (
          <li key={id}>
            <Link
              to={path}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#00df9a] hover:text-black transition duration-300"
              aria-label={text}
            >
              {icon}
              <span>{text}</span>
            </Link>
          </li>
        ))}
      </ul>

      
      <button
        onClick={toggleNav}
        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
      >
        {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      
      <div
        className={`fixed top-0 left-0 h-full w-3/5 max-w-xs bg-black border-r border-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${navOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-[#00df9a] text-4xl font-bold m-6 select-none">Gouteko</h2>
        <ul className="flex flex-col space-y-4 px-6">
          {navItems.map(({ id, text, path, icon }) => (
            <li key={id}>
              <Link
                to={path}
                onClick={() => setNavOpen(false)} 
                className="flex items-center gap-3 text-white text-lg rounded-md p-3 hover:bg-[#00df9a] hover:text-black transition duration-300"
                aria-label={text}
              >
                {icon}
                <span>{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      
      {navOpen && (
        <div
          onClick={toggleNav}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
