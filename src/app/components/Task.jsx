

import DatePicker from "react-datepicker";
import { useState, useRef } from "react";
import Cookies from "universal-cookie";
import { setDoc, collection, serverTimestamp, doc } from "firebase/firestore";
import { database } from "../firebase-config";

import "react-datepicker/dist/react-datepicker.css";

const cookies = new Cookies();
export default function Task({InputRef, task, setTask, A_tasks, setA_tasks}) {
    const inputRef = useRef(null);
    const SDate = new Date();
    let currentUser = cookies.get("user-info");
    const dateNow = new Date();
    function Cancel() { 
        setTask("");
        InputRef.current.value = "";
        console.log('cancelled');
    }
    const handleSubmit = async ( task, description) => {
        
        try {
            const taskJson = {
                task,
                description: description.current.value,
                uid: currentUser.uid,
                createdAt: dateNow,
                Deadline: SDate,
                
            }
            let arr = [];
            if(A_tasks) {
                arr = [...A_tasks, taskJson];
                
            }else {
                arr = [taskJson];
            }
            await setDoc(doc(database, "userInfor",currentUser.uid), {
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                displayName: currentUser.displayName,
                uid : currentUser.uid,
                createdAt: currentUser.createdAt,
                updatedAt: currentUser.updatedAt,
                taskArr : arr
            });

            taskJson.newTask = true;
            taskJson.Deadline = {seconds: SDate.getTime()/1000};
            let arr1 = [];
            if(A_tasks){
                let arr2 = [...A_tasks, taskJson];
                arr1 = arr2.sort((a,b) => a.Deadline.seconds - b.Deadline.seconds);
                console.log("pushed successfully");

            }else{
                arr1 = [taskJson];
            }
            console.log("This is arr tasks",arr1);
            setA_tasks(arr1);
        } catch (error) {
            console.log("Error adding doc: ", error);
            alert("error: " + error.message);
            
        }
        setTask('');
        InputRef.current.value = "";
        console.log('submitted');
    }
    
  
    return (
        
        <div className="flex flex-col fixed inset-0 bg-white/70 backdrop-blur-sm items-center justify-center z-50 text-center w-screen h-screen">
            
            <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg w-1/2 h-2/5 border-2 border-green-500">
                <p className=" text-gray-800 overflow-hidden">{task}</p>
                
                
                <input type="text" ref={inputRef} className=" text-gray-800 text-wrap text-left text-xs w-full h-16 px-1 outline-none border-2 border-black-900" placeholder="description" />
                
                <DatePicker selected={SDate} onChange={(date) => setSDate(date)} className="block w-48 text-gray-800 border-2 border-black-900 "/>
                <div className="flex justify-end space-x-4">
                    <button onClick={Cancel} className="w-20 h-10 bg-red-600 text-white rounded-lg mt-2 text-sm items-end ">Cancel </button>
                    <button onClick={()=>{ handleSubmit(task, inputRef) }} className="w-20 h-10 bg-blue-500 text-white rounded-lg mt-2 text-sm items-end ">Add </button>
                </div>
                
                
            </div>
        </div>
      
    )
}
