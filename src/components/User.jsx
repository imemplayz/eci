import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { MdEditSquare, MdDeleteForever } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

function User({ name, email, phone, department, level, message }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const isAdminLogged = localStorage.getItem('isAdmin');
    if (isAdminLogged === 'true') {
      setIsAdminLoggedIn(true);
    }

    const handleStorageChange = (event) => {
      if (event.key === 'isAdmin') {
        const isAdminLogged = localStorage.getItem('isAdmin');
        setIsAdminLoggedIn(isAdminLogged === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={'bg-blue-100 px-5 py-2 rounded-md flex items-center justify-between'}>
        <div className='flex items-center gap-2'>
          <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
          <div>
            <p className='font-bold'>
              {name}
            </p>
            <p>{email}</p> 
          </div>
        </div>
        <div>
          {isAdminLoggedIn && (
            <div
              className='view text-blue-400 bg-blue-400/25 rounded-full px-5 py-2 cursor-pointer hover:bg-blue-400/50 transition-all ease-in-out duration-150'
              onClick={toggleExpand}
            >
              <FaArrowRight className={`inline ${isExpanded ? 'rotate-90' : ''}`}/>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="bg-gray-400/25 border border-1 border-gray-400 px-5 py-2 rounded-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='flex justify-between items-start'>
              <div className='flex flex-col justify-start'>
                <p>
                  Phone Number:
                  <span className="font-bold"> {phone}</span>
                </p>
                <p>
                  Department:
                  <span className="font-bold"> {department}</span>
                </p>
                <p>
                  Level:
                  <span className="font-bold"> {level}</span>
                </p>
                <p>
                  Message:
                  <span className="font-bold"> {message}</span>
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2 bg-yellow-500/25 text-yellow-500 py-2 px-3 rounded-full cursor-pointer hover:bg-yellow-500/50 transition-all ease-in-out duration-150'>
                  <MdEditSquare/>
                  Update
                </div>
                <div className='flex items-center gap-2 bg-red-500/25 text-red-500 py-2 px-3 rounded-full cursor-pointer hover:bg-red-500/50 transition-all ease-in-out duration-150'>
                  <MdDeleteForever/>
                  Delete
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default User
