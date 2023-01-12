import { initializeApp } from "firebase/app";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";

/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const analytics = getAnalytics(app);
*/
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXgeXdXXErOfFs5VoHVTQ9TEKOoeaV9K4",
  authDomain: "pet-adoption-feae7.firebaseapp.com",
  projectId: "pet-adoption-feae7",
  storageBucket: "pet-adoption-feae7.appspot.com",
  messagingSenderId: "440973470973",
  appId: "1:440973470973:web:d893f033a58c9847b82294",
  measurementId: "G-55LLV14SEN",
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
const storage = getStorage(fb);

export const uploadPhoto = async (file, progressCB) => {
  try {
    const storageRef = ref(storage, `file/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    console.log(uploadTask);

    return new Promise((resolve, reject) => {
      uploadTask.task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10;
          // progressCB(progress)
        },
        (error) => {
          throw reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(storageRef);
          resolve(downloadUrl);
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
};
