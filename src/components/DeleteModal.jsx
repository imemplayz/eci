import React from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AiFillWarning } from "react-icons/ai";

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { duration: 0.5, type: "spring", damping: 40, stiffness: 300 },
  },
  exit: { y: "-100vh", opacity: 0 },
};

 


function DeleteModal({ handleClose, fullName, docId }) {
  const handleDelete = () => {
     const docRef = doc(db, "participants", docId);
     deleteDoc(docRef);
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
        <div className="p-5">
          <div className="bg-red-400/25 p-2 text-center text-red-500 flex items-center justify-center gap-2 rounded-md">
            <AiFillWarning className="text-2xl" />
            This will permanently delete all data associated with this participant.
          </div>
          <h1 className="text-center my-5 text-gray-500">Are you sure you want to delete <span className="bg-gray-400/25 py-1 px-2 rounded-md">{fullName}</span></h1>
          <div className="flex justify-center items-center gap-5">
            <div className="bg-green-400/25 text-green-500 py-2 px-3 rounded-md cursor-pointer hover:bg-green-400/50 transition-all ease-in-out duration-150"
            onClick={handleClose}>Cancel</div>
             <div className="bg-red-400/25 text-red-500 py-2 px-3 rounded-md cursor-pointer hover:bg-red-400/50 transition-all ease-in-out duration-150"
             onClick={handleDelete}
             >Delete</div>

          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default DeleteModal;
