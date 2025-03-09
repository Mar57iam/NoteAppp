import axios from "axios";
import React, { createContext, useState } from "react";

export const authContext = createContext();

export default  function  AuthContext({ children }) {

  const [Token, setToken] = useState(localStorage.getItem('userToken')|| null)
  const registerUserFn = async (values) => {

    try {
     
      const data = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp` , values)

      console.log(data);

      return data
      
    } catch (error) {

      console.log(error);
      throw error
    }
  };

  const loginUserFn = async (values) => {

    try {
     
      const data = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signin` , values)

      console.log(data);
      setToken(data.data.token)
      localStorage.setItem('userToken' , data.data.token)
      

      return data
      
    } catch (error) {

      console.log(error);
      throw error
    }
  };

  return (
    <authContext.Provider value={{ registerUserFn , loginUserFn , Token, setToken }}>
      {children} 
    </authContext.Provider>
  );
}
