import {
  ref,
  uploadBytes,
  getMetadata,
  updateMetadata,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage from "./config";

const storageRef = ref(storage);
const spaceRef = ref(storage, "images");

// Create file metadata including the content type
/** @type {any} */
const metadata = {
  cacheControl: "public,max-age=300",
  contentType: "image/jpeg",
};

async function getAllImages() {
  const result = await listAll(spaceRef);
  return await Promise.all(
    result.items.map(async (imgRef) => {
      return {
        name: imgRef.name,
        path: imgRef.fullPath,
        link: await getDownloadURL(imgRef),
      };
    })
  );
}

const getImage = async (filepath: string) => {
  return await getMetadata(ref(spaceRef, filepath))
    .then((metadata) => {
      return metadata
    })
    .catch((err) => console.log("firebase-getImage", err));
};

const upadateImage = (filepath: string) => {
  const forestRef = ref(spaceRef, filepath);
  let data = { ok: false, value: {} };
  updateMetadata(forestRef, metadata)
    .then((metadata) => {
      data = { ok: true, value: metadata };
    })
    .catch((err) => {
      data.value = err;
    });
  return data;
};

const deleteImages = async (data: string[]) => {
  return await Promise.all(data.map((path) => deleteObject(ref(storage, path))))
    .then(() => true)
    .catch((err) => console.log("firebase-deleteImages", err));
};

// 'file' comes from the Blob or File API
const addImage = async (file: File) => {
  const imageRef = ref(spaceRef, file.name);
  const snapshot = await uploadBytes(imageRef, file, metadata).catch((err) => {
    console.log("firebase-addImage", err);
    return { ok: false, value: {} };
  });
  return { ok: false, value: snapshot };
};

export default {
  storageRef,
  getAllImages,
  getImage,
  addImage,
  upadateImage,
  deleteImages,
};
