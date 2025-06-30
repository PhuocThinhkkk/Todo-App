"use client"
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import  Cookies  from "universal-cookie";                 // use import default
import { database }  from "../firebase-config.js";
import { setDoc,  doc, getDoc } from "firebase/firestore";
import Image from "next/image"
import { useRouter } from "next/navigation";

const cookies = new Cookies();
export default function SignIn() { 
  const route = useRouter();
  const hanldeSignIn = async () => { 
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
        updatedAt: dateNow,
        streaks: 0
      });
      cookies.set("user-info", JSON.stringify({
        email: results.user.email,
        photoURL: results.user.photoURL,
        displayName: results.user.displayName,
        uid : results.user.uid,
        createdAt: dateNow,
        updatedAt: dateNow,
        taskArrlength: 0,
        successTaskArr: 0,
        streaks: 0
    }));
      console.log("New user just added to database.");
    } else {
      const getDoctest = await getDoc(doc(database,"userInfor", auth.currentUser.uid));
      console.log("infor sigin: ", getDoctest.data());
      const userData = getDoctest.data();
      const taskArrlength = userData.taskArr.length;
      const successTaskArrlength = userData.successTaskArr.length;
      
      if(userData.taskArr || userData.successTaskArr ){
        delete userData.taskArr;
        delete userData.successTaskArr;
      }
      const userData2 = {
        ...userData, 
        taskArrlength: taskArrlength,
        successTaskArrlength: successTaskArrlength
      }
      cookies.set("user-info", JSON.stringify(userData2));
      console.log("old user");
    }
    route.push("/")
    
  }


  return (   
  <div className="full min-h-screen bg-white text-black flex items-center justify-center p-4 md:p-8">
    <div className="max-w-6xl  w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-36  ">
      {/* Left Content */}
      <div className="">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">Manage your tasks with My-todo</h1>
        <p className="text-lg text-gray-700 mb-4">
        Stay organized and boost your productivity with ease. Manage your tasks, set reminders, and achieve your goals—one step at a time.
        </p>
        <p className="mb-4 text-xl font-bold"> Sign in with Google </p>
        <div className="flex flex-wrap gap-4">
          <button className="w-32 h-11 rounded-xl font-extrabold duration-300 bg-green-600 cursor-pointer hover:bg-green-700" 
          onClick={hanldeSignIn}>
            Sign In
          </button>
        </div>
      </div>


      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/to-do-list-img.png"
          alt="to do list img"
          width={500}
          height={500}
          priority
          className=""
        />
      </div>
    </div>
  </div> 
  );
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
 


