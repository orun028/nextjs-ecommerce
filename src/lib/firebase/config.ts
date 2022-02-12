import { initializeApp } from "firebase/app";
import { getStorage, ref  } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: "AIzaSyCs8_Oj1tiOcEgz_P4h1eRaM3-5HQa0iPQ",
  authDomain: "nextshop2-b0356.firebaseapp.com",
  projectId: "nextshop2-b0356",
  storageBucket: "nextshop2-b0356.appspot.com",
  messagingSenderId: "299987530410",
  appId: "1:299987530410:web:40dd7df80334b70a9656d3",
  measurementId: "G-8CFT4LQ965",
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export default storage;