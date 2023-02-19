import _ from "./firebase-helper/init.js";

import storageService from "./firebase-helper/storage.js";
import databaseService from "./firebase-helper/database.js";
import authService from "./firebase-helper/auth.js";
import Toast from "./services/MyToast.js";
import { LOCAL_STORAGE_NAME } from "./global.js";


function QS(selector) {
    return document.querySelector(selector);
}

function READ_IMAGE_FILE_AS_DATA_URL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", () => {
            resolve(reader.result);
        });
    })
}

const toast = new Toast();

const profileFormElt = QS("form");
const emailInputElt = QS("#email-input");
const newPwdInputElt = QS("#new-pwd-input");
const firstnameInputElt = QS("#firstname-input");
const lastnameInputElt = QS("#lastname-input");
const usernameInputElt = QS("#username-input");
const imageInputElt = QS("#change-image-file-input");
const imagePreviewElt = QS("#img-preview");
let imageFileToUpload, userEmail;

const authInfos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));




databaseService.readData("users/" + authInfos.uid, (userInfos) => {
    console.log(userInfos);
    firstnameInputElt.value = userInfos.firstname;
    lastnameInputElt.value = userInfos.lastname;
    usernameInputElt.value = userInfos.username;
});


imageInputElt.addEventListener("change", async e => {
    imageFileToUpload = e.target.files[0];
    const base64Url = await READ_IMAGE_FILE_AS_DATA_URL(imageFileToUpload);
    console.log(base64Url);
    imagePreviewElt.src = base64Url
});

profileFormElt.addEventListener("submit", e => {
    e.preventDefault();
    
});




