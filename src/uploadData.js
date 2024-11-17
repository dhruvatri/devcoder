import { readFileSync } from "fs";
import { resolve } from "path";
import { collection, addDoc } from "firebase/firestore";
import db from "./firebaseConfig.js";

// Resolve the correct path to problems.json
const problemFilePath = resolve("./assets/submissionData.json");
console.log("Loading problems.json from:", problemFilePath);

const problemData = JSON.parse(readFileSync(problemFilePath, "utf8"));

const uploadData = async () => {
  const problemsCollection = collection(db, "submissionData");

  for (const problem of problemData) {
    try {
      const docRef = await addDoc(problemsCollection, problem);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};

uploadData();
