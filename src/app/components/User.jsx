import backgroundImage from "../imgs/User.png";
import { database }  from "../firebase-config.js";
import { collection, query, where, getDocs, querySnapshot } from "firebase/firestore";
import Cookies from "universal-cookie";
import { useState } from "react";



const cookies = new Cookies();
export default function User() {  
    const userCurrent = cookies.get("user-info");
    console.log(userCurrent);
    
    return (
        <div className="flex justify-center items-center bg-cover bg-center bg-no-repeat w-full h-screen"
        style={{backgroundImage: `url(${ backgroundImage.src })`}}
        >
            <div className="flex flex-col items-center justify-center bg-white bg-opacity-50 p-4 rounded-lg shadow-lg 
            w-3/4 h-3/4">
                <div className="flex w-full h-32 bg-gray-300 m-4 items-center">

                    <div className="w-24 h-24 bg-gray-400 rounded-full m-4"
                    style={{backgroundImage: `url(${ userCurrent?.photoURL })`}}></div>
                    
                    <div className="flex-1 text-2xl font-bold text-sky-950">{userCurrent?.displayName || "Guest"}</div>
                    
                </div>
                <div className="flex-1 text-2xl font-bold">This is details</div>
            </div>
            
        </div>
    );
}