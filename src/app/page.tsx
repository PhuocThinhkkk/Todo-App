/* eslint-disable */
"use client" // This is a client-side component
import SideBar from "./components/SideBar";
import React, {useState} from "react";
import User from "./components/User";
import SignIn from "./components/SignIn";
import Cookies from "universal-cookie";
import AddTask from "./components/AddTask";
import SuccessTask from "./components/SuccessTask"


const cookies = new Cookies

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(!!cookies.get("auth-token"));
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isSuccesTaskOpen, setIsSuccessTaskOpen] = useState(false);
  const [What, setWhat] = useState("Home");

  console.log( What );
  const rooms = ["User","AddTask", "SuccessTask", "Settings", "Logout"];
  const closeAll = () => { 
    setIsUserOpen(false);
    setIsAddTaskOpen(false);
    setIsSuccessTaskOpen(false);
  }

  for (let i = 0; i < rooms.length; i++) {
    if (What === rooms[0] && !isUserOpen ) { // infinte loop here if I remove the isUserOpen condition
      closeAll();
      setIsUserOpen(true);
      console.log("User is open");  
    }else if (What === rooms[1] && !isAddTaskOpen) {
      closeAll();
      setIsAddTaskOpen(true);
      console.log("add task is open");
    }
    else if(What === rooms[2] && !isSuccesTaskOpen){
      closeAll();
      setIsSuccessTaskOpen(true);
      console.log("success task component is open");
    }
  }

  if (!isSignedIn) {
    return (
      <SignIn setWhat = { setWhat } setIsSignedIn = {setIsSignedIn} />
    );
  }
  if (isUserOpen) {
    return (
      <div className="flex bg-white h-screen  text-green-500 font-bold text-4xl ">
      <SideBar setWhat = { setWhat }/>
      <User/>
      </div>
      
    );
  }
  if (isAddTaskOpen) {
    return (
      <div className="flex bg-white h-screen  text-green-500 font-bold text-4xl ">
        <SideBar setWhat = { setWhat }/>
        <AddTask/>
      </div>
    );
  }
  if(isSuccesTaskOpen){
    return (
      <div className="flex bg-white h-screen  text-green-500 font-bold text-4xl ">
        <SideBar setWhat = { setWhat }/>
        <SuccessTask/>
      </div>
    );
  }
  return (
    <div className="flex bg-white h-screen  text-green-500 font-bold text-4xl ">
      <SideBar  setWhat = { setWhat }/>
      <User></User>
    </div>
  );
}
