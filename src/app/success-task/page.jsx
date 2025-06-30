"use client"
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { doc, getDoc } from "firebase/firestore";
import { database } from '../firebase-config';
import { FaCheckCircle } from "react-icons/fa";
import SideBar from '../components/SideBar';

const cookies = new Cookies();
const SuccessTask = () => {
  const [successTasks, setSuccessTasks] = useState([]);
  useEffect(() => { 
    const set_Tasks = async () =>{
      const taskdb = await getSuccessedTask(currentUser);
      console.log("taskdb :",taskdb);
      setSuccessTasks(taskdb);
    }
    set_Tasks();
  }, []);
  const currentUser = cookies.get("user-info");
  
  return (
    <>

    <SideBar></SideBar>
    <div className='ml-24 min-h-screen min-w-screen bg-amber-50'>
      <div className='flex-col w-full'>
        <div className='h-16'></div>
        <span className='mx-16 font-bold underline-offset-2 font-sans text-2xl lg:text-4xl text-black'>Your activity in 2025 </span>
        <div className='flex justify-center items-center my-10'>
          <TaskList successTasks={successTasks}></TaskList>
        </div>
    </div>
    </div>
    
    </>
    
  )
}

const getSuccessedTask = async (currentUser) => {
  const db = await getDoc(doc(database, "userInfor", currentUser.uid));
  const userdb = db.data();
  
  let arr = [];
  if(userdb?.successTaskArr){
    return userdb.successTaskArr;
    
  }
  return arr;
}

const TaskList = ({ successTasks }) =>{
  return (
  <div className='flex-col w-5/6 font-bold'>
    {successTasks?.map((element, index) => {
      const timeObj = new Date(element.Deadline.seconds * 1000);
      const DayAndMonth = `${timeObj.getDate()}/${timeObj.getMonth() + 1}`;
    
      
      return (
        <div key={index} className="flex items-center bg-white hover:bg-neutral-100 transition-all duration-300 h-16 text-xs border-t border-y-neutral-500 text-black ">
         
          <FaCheckCircle className='text-3xl hover:text-4xl transition-all duration-300 absolute m-2 rounded-full'></FaCheckCircle>
          <div className='w-10'></div>
          <div className='flex-col flex-2'>
              <div className="w-1/3 m-3 overflow-hidden overflow-x-hidden text-nowrap">
              {element.task}
            </div>
            <div className="hidden lg:block m-3 overflow-hidden overflow-x-hidden text-nowrap">
              {element.description || "no description"}
            </div>
          </div>
          
          <div className="flex-1 text-center">
            {DayAndMonth || "Loading..."}
          </div>
        
        </div>
              
        );
    })}
  </div>
  )
}


export default SuccessTask