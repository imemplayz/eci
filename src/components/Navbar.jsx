import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AnimatePresence, motion } from 'framer-motion';
import { FaSignInAlt, FaArrowRight } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import {RiLogoutBoxRFill} from 'react-icons/ri';
import InfoModal from './InfoModal';
import logo from '../images/logo.png';
import User from './User';

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [admin, setAdmin] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrontCredentials, setWrongCredentials] = useState(false);


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLoginOpen(false);
  };

  const toggleLogin = () => {
    setLoginOpen((prevState) => !prevState);
  };


    const q = query(collection(db, "admins"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let admins = [];
      querySnapshot.forEach((doc) => {
        admins.push(doc.data());
      });
      setAdmin(admins);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const matchingAdmin = admin.find((a) => a.username === username && a.password === password);
    if (matchingAdmin) {
      setWrongCredentials(false);
      console.log('logged in');
      setIsAdminLoggedIn(true);
      localStorage.setItem('username', username);
      localStorage.setItem('isAdmin', true)
      setLoginOpen(false);
    } else {
      setWrongCredentials(true);
      setTimeout(() => {
        setWrongCredentials(false);
      }, 3000);
      console.log('wrong credentials');
    }
  };

    const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    };



  return (
    <>
      <div className='navbar mx-16 my-5 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img src={logo} alt='logo' className='w-16 h-16' />
          <h2 className='text-blue-500 font-sans'>ENGLISH CLUB ISET</h2>
        </div>

        <div className='flex items-center gap-3'>
          <div
            className='bg-blue-500/25 text-blue-500 py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 hover:bg-blue-500/50 transition-all ease-in-out duration-150'
            onClick={openModal}
          >
            <FaSignInAlt />
            Register
          </div>

          <motion.div
            className='relative'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {!isAdminLoggedIn && (
            <div
              className='bg-blue-500/25 text-blue-500 py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 hover:bg-blue-500/50 transition-all ease-in-out duration-150'
              onClick={toggleLogin}
            >
              <MdAdminPanelSettings />
              Login as admin
            </div>
            )}
            {isAdminLoggedIn && (
            <div
              className='bg-blue-500/25 text-blue-500 py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 hover:bg-blue-500/50 transition-all ease-in-out duration-150'
              onClick={handleLogout}
            >
              <RiLogoutBoxRFill />
              Logout
            </div>
            )}
            <AnimatePresence initial={false} mode='wait'>{loginOpen && (
              <motion.div
                className='absolute right-0 top-10 bg-white rounded-md shadow-md p-4 w-64'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='mb-2'>
                <AnimatePresence initial={false} mode='wait'>
                    {wrontCredentials &&
                    <motion.div 
                    className='bg-red-500/25 text-red-500 border border-1 border-red-500 text-sm py-1 px-2 text-center rounded-md mb-2'
                    initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                    >
                        <p>username or password incorrect!</p>
                    </motion.div>
                    }
                    </AnimatePresence>
                  <label htmlFor='username' className='block text-gray-500'>
                    Username
                  </label>
                  <input
                    type='text'
                    id='username'
                    name='username'
                    className='bg-gray-400/25 outline-none text-gray-400 border border-1 rounded-md p-2 w-full focus:bg-blue-400/25 focus:text-blue-400 focus:border-blue-400'
                    onChange={
                        (e) => setUsername(e.target.value)
                      }
                  />
                </div>
                <div>
                  <label htmlFor='password' className='block text-gray-500'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    autoComplete='off'
                    autoFocus={false}
                    className='bg-gray-400/25 outline-none text-gray-400 border border-1 rounded-md p-2 w-full focus:bg-blue-400/25 focus:text-blue-400 focus:border-blue-400'
                    onChange={
                        (e) => setPassword(e.target.value)
                      }
                  />
                  <div className='flex justify-end'>
                    <div className='bg-gray-400/25 text-gray-500 py-2 px-3 rounded-full mt-4 w-fit flex items-center gap-2 cursor-pointer hover:bg-gray-400/50 transition-all ease-in-out duration-150'
                    onClick={handleLogin}>
                    <p>Proceed</p>
                    <FaArrowRight />
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            )}</AnimatePresence>
            
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false} mode='wait'>
        {modalOpen && <InfoModal modalOpen={modalOpen} handleClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
