import AddTaskBg from '../imgs/addTask.png';
import { IoIosAddCircle } from 'react-icons/io';
import { useRef, useState, useEffect, use } from 'react';
import Task from './Task';
import Cookies from 'universal-cookie';
import TaskTime from './TaskTime';
import { setDoc,  doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { database } from '../firebase-config';

const cookies = new Cookies();
export default function AddTask() {
    const [task, setTask] = useState('');
    const [A_tasks, setA_tasks] = useState([]);
    useEffect(() => {getData();}, []);
    const InputRef = useRef(null);
    const currentUser = cookies.get("user-info");
    if(A_tasks.length > 0){  
        console.log("this is A_task: ",A_tasks);   
    }
    
    const getData = async () => {
        const getDb = await getDoc(doc(database, "userInfor", currentUser.uid));
        let arr1 = getDb.data().taskArr;
        let arr2 = arr1.sort((a,b) => a.Deadline.seconds - b.Deadline.seconds);
        setA_tasks(arr2);
        console.log("get db",arr2);
    }
    return (
        <div className='bg-cover bg-center bg-no-repeat w-full h-screen bg-gray-300'>
            <div className="flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat w-full h-screen
            ">
                <div className='flex justify-center items-center bg-white bg-opacity-50 p-3 rounded-lg shadow-lg w-3/4 h-12
                fixed z-0 inset-0 left-1/2 top-10 transform -translate-x-1/2 -translate-y-1/2 '>
                    <input type="text" className='text-sm w-full h-full px-1 outline-none' placeholder='Add a task' ref={ InputRef }/>
                    <Button Icon={<IoIosAddCircle/>} onClick={ ()=>{ setTask(InputRef.current.value) } }  />
                </div>
                
                <div className='flex flex-col gap-1 text-slate-950 bg-white bg-opacity-70 w-2/3 h-1/2 fixed top-1/2 left-1/2 z-0 
                inset-0 rounded-sm -translate-x-1/2 -translate-y-1/4 overflow-y-scroll no-scrollbar '>
                    
                    {A_tasks?.map((element, index) => {
                        const timeObj = new Date(element.Deadline.seconds * 1000);
                        const Day = timeObj.getDate();
                        const Month = timeObj.getMonth()+1;
                        const DayAndMonth = String(Day) + "/" + String(Month);
                        return(                     // why we need to return ?? why unique key ??
                        <div key={index} className='flex items-center justify-between bg-white h-8 text-xs '>  
                            <div className='w-1/3 m-3 overflow-hidden overflow-x-hidden text-nowrap'>{element.task}</div>         
                            <div className='m-3 overflow-hidden overflow-x-hidden text-nowrap'>{element.description || "no description"}</div>         
                            <div className="w-14 text-center">
                                {DayAndMonth || "Loading..."}
                                
                            </div>
                           
                        </div>
                        )
                    
                        })
                    }
                </div>
                    


            </div>
            { task ? <Task InputRef={InputRef} task= {task} setTask= { setTask } A_tasks={ A_tasks } setA_tasks={ setA_tasks }/> : null }
           
        </div>
        
    );

}

const Button = ({ Icon, onClick }) => {    // need props onclick
    return (
      <div onClick={onClick} className="flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer bg-green-400 text-white ml-3
                  hover:bg-green-500 hover:text-gray-800
                  transition duration-300 ease-in-out">
          {Icon}
      </div>
      
    );
  }