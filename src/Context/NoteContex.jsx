import axios from 'axios';
import React, { createContext } from 'react'




export const noteContext = createContext();


export default function NoteContex( {children}) {

  const getUserNotesFn = async ( values) => {

    try {
      const data = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes` ,{headers:
        {token: "3b8ny__" + localStorage.getItem("userToken")}
      })
    console.log(data);
    
    return data
     
      
    } catch (error) {

      console.log(error);
      throw error
    }
  };




    const addNoteFn = async ( values) => {

        try {
          const data = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes` , values ,{headers:
            {token: "3b8ny__" + localStorage.getItem("userToken")}
          })
        console.log(data);
        
        return data
         
          
        } catch (error) {
    
          console.log(error);
          throw error
        }
      };


      const deleteNotesFn = async ( id) => {

        try {
          const data =  await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}` ,{headers:
            {token: "3b8ny__" + localStorage.getItem("userToken")}
          })
        console.log(data);
        
        return data
         
          
        } catch (error) {
    
          console.log(error);
          throw error
        }
      };


      
      const updateNoteFn = async (id, values) => {  // تعديل ترتيب المعاملات
        try {
          const { data } = await axios.put(
            `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
            values,
            {
              headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
            }
          );
          return data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      };

  return (
    <>
        <noteContext.Provider value={{addNoteFn , getUserNotesFn , deleteNotesFn , updateNoteFn}} >
            {children}
            </noteContext.Provider>
    </>
  )
}
