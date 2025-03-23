import backgroundImage from "../imgs/User.png";
import { database }  from "../firebase-config.js";
import { collection, query, where, getDocs, querySnapshot } from "firebase/firestore";
import Cookies from "universal-cookie";
import { useState } from "react";



const cookies = new Cookies();
export default function User() {  
    const userCurrent = cookies.get("user-info");
    console.log(userCurrent);
    // <div className="w-24 h-24 bg-gray-400 rounded-full m-4"
    //style={{backgroundImage: `url(${ userCurrent?.photoURL })`}}></div>
                    
    
    return (
        <div className="flex justify-center items-center bg-white bg-center w-full h-screen">
            <div className="flex flex-col  bg-white bg-opacity-50 p-4 rounded-lg shadow-lg 
            w-full h-5/6">
                <span className="text-xl lg:text-2xl text-black font-bold font-sans">Welcome back, {userCurrent?.displayName}</span>
                <div className="flex w-11/12 h-32 m-4 items-center">
                   <span className="text-xl"> </span>
                    
                </div>
                
            </div>
            
        </div>
    );
}