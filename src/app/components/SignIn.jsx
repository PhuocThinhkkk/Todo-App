import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import SideBar from "./SideBar";
import User from "./User";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import  Cookies  from "universal-cookie";                 // use import default
import { database }  from "../firebase-config.js";
import { setDoc,  doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";


const cookies = new Cookies();


export default function SignIn( {setWhat, setIsSignedIn}) { 
  return (    
  <div className="flex bg-white h-screen  text-green-500 font-bold text-4xl ">
      <SideBar setWhat = { setWhat }/>
      <User/>
      <div className="flex flex-col fixed inset-0 bg-white/70 backdrop-blur-sm items-center justify-center z-50 text-center">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="text-gray-500">You need to sign in to continue</p>
          <div className="flex items-center justify-center space-x-4 m-10">
            <span className="text-gray-500 text-4xl font-bold text-center">Sign in with Google</span>
            <FcGoogle className="text-6xl" />
          </div>
          
          <button

            onClick={ () => hanldeSignIn(setIsSignedIn)  }
            className="bg-green-500 text-white px-4 py-2 rounded-lg
            hover:bg-green-600 transition-colors
            duration-300 ease-linear"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

const hanldeSignIn = async (setIsSignedIn) => { 
  const results = await signInWithPopup(auth, provider);
  const dateNow = new Date();
  const user = auth.currentUser;
  cookies.set("auth-token", results.user.stsTokenManager.refreshToken);
  if (!user) {
    console.log("No user is signed in.");
    return;
  }
  const creationTime = user.metadata.creationTime;
  const lastSignInTime = user.metadata.lastSignInTime;

  if (creationTime === lastSignInTime) {
    await setDoc(doc(database, "userInfor",results.user.uid), {
      email: results.user.email,
      photoURL: results.user.photoURL,
      displayName: results.user.displayName,
      uid : results.user.uid,
      createdAt: dateNow,
      updatedAt: dateNow
    });
    cookies.set("user-info", JSON.stringify({
      email: results.user.email,
      photoURL: results.user.photoURL,
      displayName: results.user.displayName,
      uid : results.user.uid,
      createdAt: dateNow,
      updatedAt: dateNow
  }));
    console.log("New user just added to database.");
  } else {
    const getDoctest = await getDoc(doc(database,"userInfor", auth.currentUser.uid));
    console.log("infor sigin: ", getDoctest.data());
    const userData = getDoctest.data();
    if(userData.taskArr){
      delete userData.taskArr;
    }
    cookies.set("user-info", JSON.stringify(userData));
    console.log("old user");
  }
  setIsSignedIn(true);   
}
export const getUserFromFireBase = async (uid) =>{
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const collection = "userInfor";
  const documentId = uid;
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}/${documentId}`;

  const extractField = (field) => {
    if (field?.stringValue) return field.stringValue;
    if (field?.integerValue) return Number(field.integerValue);
    if (field?.arrayValue) return field.arrayValue.values.map(extractField);
    if (field?.mapValue) return processFirestoreData(field.mapValue.fields);
    return field; 
  };

  const processFirestoreData = (fields) => {
    return Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, extractField(value)])
    );
  };

  try{
  const uidToken = await auth.currentUser.getIdToken();

  const response = await fetch(firestoreUrl, {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${uidToken}`,
      },
  });
  var data = await response.json();
  if(!data.fields){
    console.error("No data.");
  }

  console.log("🔥 Data has been taken");
  
  }
  catch (error){
    console.error("error when called API ", error);
  } finally {
    const userData = processFirestoreData(data.fields);
    console.log(userData);
    cookies.set("user-info", JSON.stringify(userData));
    console.log("API called");
  }
};
 


