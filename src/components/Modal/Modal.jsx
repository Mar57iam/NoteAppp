import React, { useContext, useEffect } from 'react';
import { modalContext } from '../../Context/ModalContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteContext } from '../../Context/NoteContex';
import Swal from 'sweetalert2'

export default function Modal({getUserNotes , editingNote}) {
  const { showModal, setShowModal  } = useContext(modalContext);

  const {addNoteFn , updateNoteFn} = useContext(noteContext)

  const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
  });

  const {register, handleSubmit, formState: { errors , isSubmitting },setValue } = useForm({ mode: 'all', resolver: zodResolver(schema) });

 

  const onSubmit = async (values) => {
    try {
      if (editingNote) {
        await updateNoteFn(editingNote._id, values);
      } else {
        await addNoteFn(values);
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${editingNote ? "Note Updated Successfully" : "Note Added Successfully"}`,
        showConfirmButton: false,
        timer: 1500
      });
      setShowModal(false);
      getUserNotes();
    } catch (error) {
      console.log(error);
      throw error; // اجعلي `handleSubmit` يعرف بوجود خطأ
    }
  };
  
  
  useEffect(() => {
    if (editingNote) {
      setValue('title', editingNote.title);
      setValue('content', editingNote.content);
    } else {
      setValue('title', '');
      setValue('content', '');
    }
  }, [editingNote, setValue]);

  return (
    <>
      {showModal && (
        <div id="small-modal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{ editingNote ? "Edit Note" : "New Note"}</h3>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body */}
            <form  className="p-4 md:p-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Note Title"
                className="w-full bg-transparent mb-4 text-gray-900 dark:text-white focus:outline-none focus:border-gray-500"
                {...register('title')}
              />
              {errors.title && <div className="text-red-500 text-sm m-2">{errors.title.message}</div>}

              <textarea
                placeholder="Write your thoughts here..."
                className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-gray-500 resize-none"
                rows="3"
                {...register('content')}
              />
              {errors.content && <div className="text-red-500 text-sm m-2">{errors.content.message}</div>}

              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
  type="submit"
  className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:text-gray-950 dark:hover:bg-white dark:hover:text-gray-900"
>
  {isSubmitting ? (
    <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"></div>
  ) : (
    editingNote ? "Update Note" : "Add Note"
  )}
</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
