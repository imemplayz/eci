import React, { useState } from 'react'
import {motion} from 'framer-motion'
import Backdrop from './Backdrop'
import { FaArrowRight } from 'react-icons/fa';
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore"; 

const dropIn = {
    hidden: {y: "-100vh", opacity: 0},
    visible: {y: "0", opacity: 1, transition: {duration: 0.5, type: "spring", damping: 40, stiffness: 300}},
    exit: {y: "-100vh", opacity: 0}
}

function UpdateModal( {handleClose, firstName, participantLastName, participantEmail, participantPhone, participantDepartment, participantLevel, message, docId}) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [level, setLevel] = useState('');
    const [infoMessage, setMessage] = useState('');
    const [role, setRole] = useState('');

    
    const handleUpdate = async (e) => {
      e.preventDefault();
      const participantRef = doc(db, "participants", docId);
      const updates = {};
      if (name) updates.FirstName = name;
      if (lastName) updates.LastName = lastName;
      if (email) updates.Email = email;
      if (phone) updates.Phone = phone;
      if (department) updates.Department = department;
      if (level) updates.Level = level;
      if (infoMessage) updates.Message = infoMessage;
      if (role) updates.Role = role;
      await updateDoc(participantRef, updates);
      handleClose();
    }
    


      
      
      
    
  return (
    <Backdrop onClick={handleClose}>
       <motion.div
       onClick={(e) => e.stopPropagation()}
       className="bg-white w-[700px] rounded-md"
       variants={dropIn}
         initial="hidden"
            animate="visible"
            exit="exit"
       >
        <div className="upper p-5 flex justify-between items-center">
            <div className='flex items-center justify-between w-fit gap-3 '>
                <p className='py-2 px-3 bg-gray-400/25 text-gray-500 rounded-md'>English Club Iset</p>
                <p className='text-yellow-500'>Update</p>
            </div>
            <div className='bg-gray-400/25 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-gray-500 hover:bg-gray-400/50 transition-all ease-in-out duration-150'
            onClick={handleClose}>X</div>
        </div>
        <div className="mid px-10 flex justify-between gap-10">
          <div className="left">
            <div className="name">
                <p className='text-gray-500'>First Name:</p>
                <input onChange={(e) => {
                    setName(e.target.value);
                }} type="text" 
                placeholder={firstName}
                className='bg-gray-400/25 text-gray-500 py-2 px-2 rounded-md w-fit outline-none focus:bg-yellow-500/25 focus:text-yellow-500 focus:border border-1 border-yellow-500 transition-all ease-in-out duration-150' />
            </div>
            <div className="name">
                <p className='text-gray-500'>Last Name:</p>
                <input  onChange={(e) => {
                    setLastName(e.target.value);
                }} type="text"
                placeholder={participantLastName}
                className='bg-gray-400/25 text-gray-500 py-2 px-2 rounded-md w-fit outline-none focus:bg-yellow-500/25 focus:text-yellow-500 focus:border border-1 border-yellow-500 transition-all ease-in-out duration-150' />
            </div>
            <div className="email">
                <p className='text-gray-500'>Email:</p>
                <input  onChange={(e) => {
                    setEmail(e.target.value);
                }} type="text"
                placeholder={participantEmail}
                className='bg-gray-400/25 text-gray-500 py-2 px-2 rounded-md w-fit outline-none focus:bg-yellow-500/25 focus:text-yellow-500 focus:border border-1 border-yellow-500 transition-all ease-in-out duration-150' />
            </div>
            <div className="phone">
                <p className='text-gray-500'>Phone:</p>
                <input  onChange={(e) => {
                    setPhone(e.target.value);
                }} type="number"
                placeholder={participantPhone}
                className='bg-gray-400/25 text-gray-500 py-2 px-2 rounded-md w-fit outline-none focus:bg-yellow-500/25 focus:text-yellow-500 focus:border border-1 border-yellow-500 transition-all ease-in-out duration-150' />
            </div>
          </div>
          <div className="right">
          <div className="department">
                <p className='text-gray-500'>Department:</p>
                <input  onChange={(e) => {
                    setDepartment(e.target.value);
                }} type="text"
                placeholder={participantDepartment}
                className='bg-gray-400/25 text-gray-500 py-2 px-2 rounded-md w-fit outline-none focus:bg-yellow-500/25 focus:text-yellow-500 focus:border border-1 border-yellow-500 transition-all ease-in-out duration-150' />
            </div>
            <div className="level">
                <p className='text-gray-500'>Studying level:</p>
                <input  onChange={(e) => {
                    setLevel(e.target.value);
                }} type="text"
                placeholder={participantLevel}
                className='bg-gray-400/25 text-gray-500 py-2 px-2 rounded-md w-fit outline-none focus:bg-yellow-500/25 focus:text-yellow-500 focus:border border-1 border-yellow-500 transition-all ease-in-out duration-150' />
            </div>
          </div>
        </div>
        <div className="neededinfo mx-10 my-5">
            <p className='text-gray-500'>Additional Information:</p>
            <textarea  onChange={(e) => {
                    setMessage(e.target.value);
                }} 
                placeholder={message}
                className='bg-gray-400/25 text-gray-500 py-2 px-2 outline-none rounded-md w-full h-36 focus:bg-yellow-500/25 focus:text-yellow-500 focus:border border-1 border-yellow-500 transition-all ease-in-out duration-150'></textarea>
        <div>
          <p className='text-gray-500 flex items-center gap-2'>Role:
          <span className={role === "Club Member"? 'text-purple-500': 'text-blue-500'}>{role}</span>
          </p>
          <div className='flex items-center gap-2'>
           <div className='bg-blue-400/25 text-blue-500 py-2 px-3 rounded-md cursor-pointer hover:bg-blue-400/50 transition-all ease-in-out duration-150'
           onClick={() => {
                setRole('Participant');
           }
           }
           >Participant</div> 
           <div className='bg-purple-400/25 text-purple-500 py-2 px-3 rounded-md cursor-pointer hover:bg-purple-400/50 transition-all ease-in-out duration-150'
           onClick={() => {
            setRole('Club Member');
       }
       }
       >Club Member</div> 
          </div>
          
        </div>
        </div>
        <div className="bottom mx-10 my-5 flex self-end">
             <div className='bg-yellow-400/25 py-2 px-3 w-fit rounded-md cursor-pointer text-yellow-500 hover:bg-yellow-400/50 transition-all ease-in-out duration-150 flex items-center gap-2'
             onClick={handleUpdate}>
                Update
                <FaArrowRight className='inline text-lg'/>
             </div>
        </div>
        
       </motion.div>

    </Backdrop>
  )
}

export default UpdateModal