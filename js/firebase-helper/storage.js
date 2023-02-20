import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

const storageService = {
    uploadFile(path, file) {
        return new Promise((resolve) => {
            const storageRef = ref(storage, path);
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file)
            .then((snapshot) => {
              console.log('Uploaded a blob or file!');
                resolve({data: snapshot});
            })
            .catch((error) => {
                console.log(error);
                resolve({error});
            });
        });
    }, 
    downloadFile(path) {
        return new Promise((resolve) => {
            const storageRef = ref(storage, path);

            getDownloadURL(storageRef)
            .then(url => {
                resolve({data: {url}});
            })
            .catch((error) => {
                console.log(error);
                resolve({error});
            })
        });
    }
};




export default storageService;