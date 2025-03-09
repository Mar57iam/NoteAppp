import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { modalContext } from "../../Context/ModalContext";
import Modal from "../Modal/Modal";
import { noteContext } from "../../Context/NoteContex";
import Notess from "../Notess/Notess";

export default function Home() {
  const { showModal, setShowModal, editingNote, setEditingNote } = useContext(modalContext);
  const { getUserNotesFn, deleteNotesFn } = useContext(noteContext);
  const [notes, setNotes] = useState([]);


  const getUserNotes = async () => {
    try {
      const { data } = await getUserNotesFn();
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

 
  const editNotes = (note) => {
    setShowModal(true);
    setEditingNote(note);
  };


  const deleteUserNotes = async (id) => {
    try {
      await deleteNotesFn(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserNotes();
  }, []); 

  return (
    <>
      <section className="ml-32 bg-gray-100 dark:bg-gray-900 min-h-screen w-full flex flex-col">
        {notes.length === 0 ? (
          <Notess />
        ) : (
          <>
            <h1 className="mt-10 mb-5 text-2xl font-bold dark:text-gray-100">Notes</h1>
            <div className="flex flex-wrap gap-4">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="w-64 p-6 min-h-56 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col"
                >
                  <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                    {note.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{note.content}</p>

                  <div className="flex justify-between items-end mt-auto">
                    <button
                      onClick={() => deleteUserNotes(note._id)}
                      className="flex justify-center items-center h-10 w-10 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => editNotes(note)}
                      className="flex justify-center items-center h-10 w-10 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    >
                      <GoPencil />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      {showModal && <Modal getUserNotes={getUserNotes} editingNote={editingNote} />}
    </>
  );
}
