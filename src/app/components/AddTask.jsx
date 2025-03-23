
import { IoIosAddCircle } from 'react-icons/io';
import { useRef, useState, useEffect, use } from 'react';
import Task from './Task';
import Cookies from 'universal-cookie';

import { setDoc,  doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from '../firebase-config';
import { MdDelete } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";

const cookies = new Cookies();
export default function AddTask() {
    const [task, setTask] = useState('');
    const [A_tasks, setA_tasks] = useState([]);
    useEffect(() => { 
        const set_Tasks = async () =>{
            const taskdb = await getData(currentUser);
            setA_tasks(taskdb);
        }
        set_Tasks();
    }, []);
    const InputRef = useRef(null);
    const currentUser = cookies.get("user-info");
    if(A_tasks.length > 0){  
        console.log("this is A_task: ",A_tasks);   
    }
    
    
    return (
        <div className='bg-cover bg-center bg-no-repeat w-full h-screen  bg-white '>
            <div className="flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat w-full h-screen
            ">
                <div className='flex justify-center items-center bg-white bg-opacity-50 p-3 rounded-lg shadow-lg w-3/4 h-12
                fixed z-0 inset-0 left-1/2 top-10 transform -translate-x-1/2 -translate-y-1/2 '>
                    <input type="text" className='text-sm w-full h-full px-1 outline-none' placeholder='Add a task' ref={ InputRef }/>
                    <ButtonIcon Icon={<IoIosAddCircle/>} onClick={ ()=>{ setTask(InputRef.current.value) } }  />
                </div>
                
                <div className='flex flex-col gap-1 text-slate-950 bg-white bg-opacity-70 w-2/3 h-1/2 fixed top-1/2 left-1/2 z-0 
                inset-0 rounded-sm -translate-x-1/2 -translate-y-1/4 overflow-y-scroll no-scrollbar '>
                    <TaskList A_tasks={A_tasks} setA_tasks={setA_tasks} currentUser={currentUser} />
                </div>                 
            </div>
            { task ? <Task InputRef={InputRef} task= {task} setTask= { setTask } A_tasks={ A_tasks } setA_tasks={ setA_tasks }/> : null }
        </div>
        
    );

}
const getData = async (currentUser) => {
    const getDb = await getDoc(doc(database, "userInfor", currentUser.uid));
    let arr1 = getDb.data().taskArr;
    let arr2 = arr1.sort((a,b) => a.Deadline.seconds - b.Deadline.seconds);
    return arr2;
}

const ButtonIcon = ({ Icon, onClick }) => {    // need props onclick
    return (
      <div onClick={onClick} className="flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer bg-green-400 text-white ml-3
                  hover:bg-green-500 hover:text-gray-800
                  transition duration-300 ease-in-out">
          {Icon}
      </div>
    );
}

const DeleteTask = async (index, setA_tasks, currentUser) => {
    try {
        const taskdb = await getData(currentUser);
        taskdb.splice(index, 1);
        setA_tasks(taskdb);
        const DocRef = doc(database, "userInfor", currentUser.uid);
        await updateDoc(DocRef, {
            taskArr: taskdb
        });
    } catch (error) {
        console.error(error);
    }
   
}

const TaskList = ({ A_tasks, setA_tasks, currentUser }) => {

    const addSuccessTask = async (e) =>{
        const db = await getDoc(doc(database, "userInfor", currentUser.uid));
        const userdb = db.data();

        let arr = userdb.taskArr;
        let arrSort = arr.sort((a,b) => a.Deadline.seconds - b.Deadline.seconds);
        const successTask = arrSort[e];
        arrSort.splice(e, 1);
        const newArr = arrSort;

        let successArr = [];
        if (userdb?.successTaskArr ) {
            for(let i = 0; i<userdb.successTaskArr.length; i++ ){
                successArr[i] = userdb.successTaskArr[i];
            }
        }
        successArr[successArr.length] = successTask;
        console.log("successTask:", successTask);
        console.log("successTask:", successArr.length);

        const DocRef = doc(database, "userInfor", currentUser.uid);
        await updateDoc(DocRef, {
            taskArr: newArr,
            successTask: successArr
        });
        console.log("add task successfully to successTask");
        setA_tasks(newArr);
    }

    return (
        <>
            {A_tasks?.map((element, index) => {
                const timeObj = new Date(element.Deadline.seconds * 1000);
                const DayAndMonth = `${timeObj.getDate()}/${timeObj.getMonth() + 1}`;
                const thisDay = new Date();
                let isDeadline = false;
                if(thisDay.getMonth() > timeObj.getMonth() || ( thisDay.getMonth() === timeObj.getMonth() && thisDay.getDate() >= timeObj.getDate())) {
                    isDeadline = true;
                }
                return (
                    <div key={index} className="flex items-center bg-white h-8 text-xs border-t border-y-neutral-500">
                        {isDeadline ? <SuccessBtn onClick={() => addSuccessTask(index)} /> : <div className='w-8'></div>}
                        <div className="w-1/3 m-3 overflow-hidden overflow-x-hidden text-nowrap">
                            {element.task}
                        </div>
                        <div className="hidden lg:block flex-2 m-3 overflow-hidden overflow-x-hidden text-nowrap">
                            {element.description || "no description"}
                        </div>
                        <div className="flex-1 text-center">
                            {DayAndMonth || "Loading..."}
                        </div>
                        <button
                            className="flex justify-center items-center rounded-lg border-4 w-20 border-red-900 bg-red-600 hover:cursor-pointer"
                            onClick={() => DeleteTask(index, setA_tasks, currentUser)} // Now currentUser is passed properly
                        >
                            <MdDelete className="text-2xl text-black rounded-t-full shadow-2xl" />
                            <span className="text-amber-50 font-medium hover:font-bold text-center">
                                Delete
                            </span>
                        </button>
                    </div>
                    
                );
            })}
        </>
    );
};


const SuccessBtn = ({onClick }) => {
    return (
        <div className='flex justify-center items-center w-8' onClick={onClick}>
            <IoCheckbox className='text-2xl hover:cursor-pointer hover:text-green-700 ' />
        </div>
    )
}

