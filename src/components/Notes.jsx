import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import api from "../api";

const Notes = ({ id }) => {
  const [allNotes, setAllNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
    try {
      const response = await api.post(
        `/leetscraper/todolist/questions/${id}/notes/create/`
      );
      const newNote = response.data;
      setAllNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (nid) => {
    try {
      await api.delete(
        `/leetscraper/todolist/questions/${id}/notes/${nid}/delete/`
      );
      setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== nid));
    } catch (error) {
      console.log(error);
    }
  };

  const openNoteModal = (note) => {
    setSelectedNote(note);
    setOpenModal(true);
  };

  const handleTitleChange = (e) => {
    setSelectedNote((prevNote) => ({
      ...prevNote,
      title: e.target.value,
    }));
  };

  const handleBodyChange = (e) => {
    setSelectedNote((prevNote) => ({
      ...prevNote,
      body: e.target.value,
    }));
  };

  const saveModalInformation = async () => {
    try {
      const response = await api.put(
        `/leetscraper/todolist/questions/${id}/notes/${selectedNote.id}/update/`,
        {
          title: selectedNote.title,
          body: selectedNote.body,
        }
      );
      const updatedNote = response.data;
      setAllNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );

      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <div className="flex flex-row items-center justify-center space-x-3 pb-2 pl-1">
        <button
          className="bg-transparent hover:bg-white/10 p-1 rounded-full"
          onClick={() => createNote()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-row space-x-4 overflow-x-scroll justify-start">
        {allNotes.length === 0 ? (
          <div className="w-80 h-80 bg-white/5 rounded-md flex justify-center items-center"></div>
        ) : (
          allNotes.map((note, index) => (
            <div
              key={index}
              className="min-w-80 w-80 h-80 bg-white/10 rounded-md relative cursor-pointer flex flex-col"
              onClick={() => openNoteModal(note)}
            >
              <div className="flex justify-between p-4">
                <p className="font-bold">{note.title}</p>
                <button
                  className="text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 flex-1 overflow-y-auto">
                <p className="text-sm h-full">{note.body}</p>
              </div>
            </div>
          ))
        )}
      </div>


      {selectedNote && (
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          className="bg-black"
        >
          <div className="bg-black/90 border-b-0 flex justify-between items-center p-4">
            <input
              className="bg-transparent border-none text-white focus:ring-0 flex-grow mr-4"
              type="text"
              value={selectedNote.title}
              onChange={handleTitleChange}
              maxLength={50}
            />
            <button
              className="text-white p-3"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>

          <Modal.Body className="bg-black/90">
            <div className="space-y-6">
              <textarea
                className="bg-transparent text-white resize-none border-none w-full focus:ring-0 p-1 h-96"
                value={selectedNote.body}
                onChange={handleBodyChange}
              />
            </div>
          </Modal.Body>

          <div className="bg-black/90 flex justify-end p-4">
            <button
              className="bg-white/10 text-white p-2 rounded"
              onClick={saveModalInformation}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Notes;
