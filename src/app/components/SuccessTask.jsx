import React from 'react'
import Cookies from 'universal-cookie';
import { doc, getDoc } from "firebase/firestore";
import { database } from '../firebase-config';

const cookies = new Cookies();
const SuccessTask = () => {
  const currentUser = cookies.get("user-info");
  
  return (
    <div className='flex-col '>
        <div className='h-16'></div>
        <span className='m-8 mt-16 font-bold underline-offset-2 font-sans text-4xl text-black'>Your activity in 2025 </span>

    </div>
  )
}

const getSuccessedTask = async (currentUser) => {
  const userdb = await getDoc(doc(database, "userInfor", currentUser.uid));
  let arr = [];
 
}



export default SuccessTask