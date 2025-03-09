import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { authContext } from "../../Context/AuthContext";
import Swal from 'sweetalert2'
export default function Login() {
  const [Isloading, setIsloading] = useState(false)
  const navigate = useNavigate()

 const {loginUserFn} = useContext(authContext )
   const [errorr, setErrorr] = useState(null)
 

  const schema = z.object({
    
    email:z.string()
    .email('email must be vaild'), 
    password:z.string()
    .regex(/^[a-zA-Z0-9]{6,}$/ , 'password must be at least 6 character or number '),
  })

  const {register , handleSubmit , formState:{errors}} = useForm({mode:'all' , resolver:zodResolver(schema)})
 
  const LoginUser = async (values) => {
    setIsloading(true)

        
    try {
     
      const {data}= await loginUserFn(values);
      console.log("User Registered:", data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Logged in successfully",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(()=>{
        navigate('/home')
      } , 1500)
      
      setIsloading(false)

    } 
    catch (error) {
      console.log(error);
      setErrorr(error.response.data.msg)
      setIsloading(false)

      
    }
  }





  
  return (
    <>
       <div className="flex justify-center items-center h-screen bg-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        
     
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-900 dark:bg-gray-600">
            <GiNotebook className="w-8 h-8 text-white" />
          </div>
        </div>

     
        <form onSubmit={handleSubmit(LoginUser)}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center mb-1">
            Welcome back
          </h5>

          <h5 className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center mb-4">
            Sign in to accsess your notes
          </h5>
     
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="Enter your Email"
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          {errors.email&&   <div className='text-red-500 text-sm m-2'>
               {errors.email.message}
          </div>}
          
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              {...register("password")}

              id="password"
              placeholder="Enter your password"
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          {errors.password&&   <div className='text-red-500 text-sm m-2'>
               {errors.password.message}
          </div>}
       
   


        
          <button
  type="submit"
  className="w-full mb-3 text-white flex items-center justify-center gap-2 bg-gray-900 hover:bg-white hover:text-gray-900 hover:border border-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:text-white dark:hover:bg-gray-900 group"
>
  {Isloading ? (
    <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white transition-all duration-300 
    group-hover:border-gray-900 group-hover:border-t-white animate-spin"></div>
  ) : (
    `Sign in →`
  )}
</button>



{errorr ? <div class="p-4 mb-4 text-sm text-center text-red-100 rounded-lg bg-red-800 " role="alert">
     In correct email or password
</div> : null}
          
          <div className="text-sm font-medium text-gray-500 text-center dark:text-gray-300 ">
            Don't have an account yet ?  
            <Link to="/register" className="text-gray-900 hover:underline dark:text-gray-400 ">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  
    </>
  )
}