import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
export const storageRef = ref(storage);

console.log(storageRef);
