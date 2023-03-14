import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { MdEditSquare, MdDeleteForever } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

function User({firstName, lastName, email, phone, department, level, message, role, id}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };


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
      <div className={role === "Club Member"?'bg-purple-100 px-3 md:px-5 py-2 rounded-md flex items-center justify-between text-xs md:text-base' :'bg-blue-100 px-3 md:px-5 py-2 rounded-md flex items-center justify-between text-xs md:text-base'}>
        <div className='flex items-center gap-2'>
          <div className={role === "Club Member"?"w-10 h-10 bg-purple-400 rounded-full" : "w-10 h-10 bg-blue-400 rounded-full"}></div>
          <div>
            <p className='font-bold'>
              {firstName + ' ' + lastName}
            </p>
            <p>{email}</p> 
          </div>
        </div>
        <div>
          {isAdminLoggedIn && (
            <div
              className={role === "Club Member"?'view text-purple-400 bg-purple-400/25 rounded-full px-3 md:px-5 py-2 cursor-pointer hover:bg-purple-400/50 transition-all ease-in-out duration-150'
            : 'view text-blue-400 bg-blue-400/25 rounded-full px-3 md:px-5 py-2 cursor-pointer hover:bg-blue-400/50 transition-all ease-in-out duration-150'} 
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
            className="bg-gray-400/25 border border-1 border-gray-400 px-5 py-2 rounded-md text-xs md:text-base"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='md:flex justify-between items-start'>
              <div className='flex flex-col justify-start gap-2'>
                <p className='flex items-center gap-2'>
                  <span className='bg-gray-400/25 py-1 px-2 rounded-md text-gray-500'>Phone Number:</span> 
                  <span className=""> {phone}</span>
                </p>
                <p className='flex items-center gap-2'>
                  <span className='bg-gray-400/25 py-1 px-2 rounded-md text-gray-500'>Department:</span> 
                  <span className=""> {department}</span>
                </p>
                <p className='flex items-center gap-2'>
                  <span className='bg-gray-400/25 py-1 px-2 rounded-md text-gray-500'>Level:</span> 
                  <span className=""> {level}</span>
                </p>
                <p className='flex items-start md:items-center gap-2'>
                  <span className='bg-gray-400/25 py-1 px-2 rounded-md text-gray-500'>Additional Information:</span> 
                  <span className="break-all"> {message}</span>
                </p>
                <p className='flex items-center gap-2'>
                <span className='bg-gray-400/25 py-1 px-2 rounded-md text-gray-500'>Role:</span> 
                  <span className={role === "Club Member"? "bg-purple-400/25 text-purple-500 border border-1 border-purple-500 py-1 px-2 rounded-md" : "bg-blue-400/25 text-blue-500 border border-1 border-blue-500 py-1 px-2 rounded-md"}> {role}</span>
                </p>
              </div>
              <div className='mt-5 md:mt-0 flex items-center gap-2'>
                <div className='flex items-center gap-2 bg-yellow-500/25 text-yellow-500 py-2 px-3 rounded-full cursor-pointer hover:bg-yellow-500/50 transition-all ease-in-out duration-150'
                onClick={openUpdateModal}
                >
                  <MdEditSquare/>
                  Update
                </div>
                <div className='flex items-center gap-2 bg-red-500/25 text-red-500 py-2 px-3 rounded-full cursor-pointer hover:bg-red-500/50 transition-all ease-in-out duration-150'
                onClick={openConfirmModal}
                >
                  <MdDeleteForever/>
                  Delete
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait">
        {isConfirmModalOpen && (
          <DeleteModal modalOpen={openConfirmModal} handleClose={closeConfirmModal} fullName={firstName + " " + lastName} docId= {id} />
        )}

        {isUpdateModalOpen && (
          <UpdateModal modalOpen={openUpdateModal} handleClose={closeUpdateModal} firstName={firstName} participantLastName={lastName} participantEmail={email} participantPhone={phone} participantDepartment={department} participantLevel={level} message={message} docId= {id} />
        )}
      </AnimatePresence>
    </>
  )
}

export default User
