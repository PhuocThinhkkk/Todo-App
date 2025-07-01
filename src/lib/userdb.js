
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
 


