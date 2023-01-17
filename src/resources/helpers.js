import { initializeApp } from "firebase/app";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXgeXdXXErOfFs5VoHVTQ9TEKOoeaV9K4",
  authDomain: "pet-adoption-feae7.firebaseapp.com",
  projectId: "pet-adoption-feae7",
  storageBucket: "pet-adoption-feae7.appspot.com",
  messagingSenderId: "440973470973",
  appId: "1:440973470973:web:d893f033a58c9847b82294",
  measurementId: "G-55LLV14SEN",
};

const fb = initializeApp(firebaseConfig);
const storage = getStorage(fb);

export const uploadPhoto = async (file) => {
  try {
    const storageRef = ref(storage, `file/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10;
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
