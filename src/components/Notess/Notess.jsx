import React from 'react'
import { FaPenClip } from "react-icons/fa6";


export default function Notess() {
  return (
<>
  <section className="bg-gray-200 dark:bg-gray-900 min-h-screen w-full flex flex-col">
    <h1 className="mt-10 mb-5 text-2xl font-bold dark:text-gray-100 ">Notes</h1>

    <div className="flex flex-wrap mt-12 items-center h-96 justify-center me-6">
       
      <div className="w-1/3 h-40 p-6 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex-col">
      <div className='text-[45px] mb-4 text-gray-800 dark:text-gray-600'><FaPenClip/></div>
        <h5 className="text-2xl font-bold text-center tracking-tight text-gray-800 dark:text-white">
          No Notes have been created yet
        </h5>
      </div>
    </div>
  </section>
</>

   
  )
}
