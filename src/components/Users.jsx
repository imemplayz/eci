import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import User from "./User";
import { FaSearch } from "react-icons/fa";

function Users() {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const q = query(collection(db, "participants"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let newParticipants = [];
      querySnapshot.forEach((doc) => {
        newParticipants.push(doc.data());
      });
      setParticipants(newParticipants);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  

  const filteredParticipants = participants.filter((participant) => {
    const fullName = `${participant.FirstName} ${participant.LastName}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="bg-white mx-10 py-5 px-10 rounded-md flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="bg-gray-200 py-2 px-3 rounded-full flex items-center">
            <FaSearch className="text-gray-400 inline mr-2" />
            <input
              type="text"
              name="users"
              id="users"
              autoComplete="off"
              placeholder="Search by name or email"
              className="bg-transparent outline-none w-56 text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* display the filtered participants */}
        <div className="flex flex-col gap-2">
          {filteredParticipants.map((participant) => (
            <User
              key={participant.id}
              name={`${participant.FirstName} ${participant.LastName}`}
              email={participant.Email}
              department={participant.Department}
              level={participant.Level}
              phone={participant.Phone}
              message={participant.Message}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
