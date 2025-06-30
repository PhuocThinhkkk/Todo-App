"use client"
import  Sidebar  from "../components/SideBar";
import ProfilePage from "./profile.jsx"


export default function User() {  
    return (
        <div >
            <Sidebar/>
            <ProfilePage></ProfilePage>
        </div>
    );
}