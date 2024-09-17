import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import api from "../api";

const Notes = ({ id }) => {
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await api.get(
          `/leetscraper/todolist/questions/${id}/notes/`
        );
        const data = response.data;
        setAllNotes(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      getNotes();
    }
  }, [id]);

  const createNote = async () => {
    try{
        const response = await api.post(`/todolist/questions/${id}/notes/create/`)
    }catch(error){
        console.log(error)
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center space-x-3">
        <p>
        Notes
        </p>
        <button className="bg-transparent hover:bg-white/10 p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div>
        {allNotes.length === 0 ? (
          <p>No notes yet</p>
        ) : (
          allNotes.map((note, index) => <p key={index}>{note}</p>)
        )}
      </div>
    </div>
  );
};

export default Notes;
