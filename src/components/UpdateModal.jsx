import React, { useState } from 'react'
import {motion} from 'framer-motion'
import Backdrop from './Backdrop'
import { FaArrowRight } from 'react-icons/fa';
import { db } from '../firebase';
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

const dropIn = {
    hidden: {y: "-100vh", opacity: 0},
    visible: {y: "0", opacity: 1, transition: {duration: 0.5, type: "spring", damping: 40, stiffness: 300}},
    exit: {y: "-100vh", opacity: 0}
}

function UpdateModal( {handleClose, firstName, participantLastName, participantEmail, participantPhone, participantDepartment, participantLevel, message}) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [department, setDepartment] = useState('');
    const [level, setLevel] = useState('');
    const [infoMessage, setMessage] = useState('');

    
    const handleUpdate = async () => {
        const docRef = doc(
          db,
          "participants",
          firstName + " " + participantLastName
        );
      
        const dataToUpdate = {};
      
        if (name) {
          dataToUpdate.firstName = name;
        } else {
          dataToUpdate.firstName = firstName;
        }
      
        if (lastName) {
          dataToUpdate.lastName = lastName;
        } else {
          dataToUpdate.lastName = participantLastName;
        }
      
        if (email) {
          dataToUpdate.email = email;
        } else {
          dataToUpdate.email = participantEmail;
        }
      
        if (phone) {
          dataToUpdate.phone = phone;
        } else {
          dataToUpdate.phone = participantPhone;
        }
      
        if (department) {
          dataToUpdate.department = department;
        } else {
          dataToUpdate.department = participantDepartment;
        }
      
        if (level) {
          dataToUpdate.level = level;
        } else {
          dataToUpdate.level = participantLevel;
        }
      
        if (infoMessage) {
          dataToUpdate.message = infoMessage;
        } else {
          dataToUpdate.message = message;
        }
      
        await updateDoc(docRef, dataToUpdate);
      
        handleClose();
      };
      
      
      
    
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