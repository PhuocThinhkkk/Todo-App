import { LiaAccessibleIcon} from "react-icons/lia";
import { GrSchedules } from "react-icons/gr";
import { FiAlertTriangle } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SideBar( ) {
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const changeIsOpen = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <>
    <main className="fixed top-0 left-0">
      <div className="text-4xl">
      <MenuBtn isOpen={isOpen} setIsOpen={changeIsOpen}/>
      <div className={`flex flex-col w-36 h-screen bg-gray-800 text-white p-4 fixed top-0 left-0 z-10
      transform ${ isOpen ? 'translate-x-0' : '-translate-x-full' } 
        lg:translate-x-0 lg:static transition duration-700 ease-in-out`}>
          <div className="mt-14">
          </div>
          <SideBarIcons Icon={<FaUserAlt/>} onClick={ () => route.push("/user")} />   
          <SideBarIcons Icon={<IoIosAddCircle/>} onClick={ () => route.push("/add-task")} />
          <SideBarIcons Icon={<BsCheckCircle/>} onClick={ () => route.push("/success-task")} />
          <SideBarIcons Icon={<GrSchedules/>} />
          <SideBarIcons Icon={<FiAlertTriangle/>} />
          <SideBarIcons Icon={<LiaAccessibleIcon onClick={() => route.push("/dashboard")}/>} />
      </div>
      </div>
    </main>
    </>
    
    
    
  );
};
export const MenuBtn = ({isOpen, setIsOpen }) => {
  return (
    <div onClick={setIsOpen } className={`lg:hidden flex items-center justify-center w-12 h-12 bg-gray-700 rounded-xl mb-4 cursor-pointer
                hover:bg-green-500 hover:text-gray-800
                transition duration-500 ease-in-out fixed top-4 left-4 z-30
                transform ${ isOpen ? 'rotate-90' : 'rotate-0' } `}>
      <HiMenu/>
    </div>
  );
    
}
export const SideBarIcons = ({ Icon, onClick }) => {    // need props onclick
  return (
    <div onClick={onClick} className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-xl mb-4 cursor-pointer
                hover:bg-green-500 hover:text-gray-800
                transition delay-200 duration-400 ease-in-out">
        {Icon}
    </div>
    
  );
}