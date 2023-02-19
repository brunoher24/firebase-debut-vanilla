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

const loginFormElt = QS("#login-form");
const loginEmailInputElt = QS("#login-email-input");
const loginPwdInputElt = QS("#login-pwd-input");

const signupFormElt = QS("#signup-form");
const signupEmailInputElt = QS("#signup-email-input");
const signupPwdInputElt = QS("#signup-pwd-input");
const firstnameInputElt = QS("#signup-firstname-input");
const lastnameInputElt = QS("#signup-lastname-input");
const usernameInputElt = QS("#signup-username-input");
const imageInputElt = QS("#signup-image-input");
const imagePreviewElt = QS("#signup-image-preview");
let imageFileToUpload;

authService.getCurrentAuthState();


imageInputElt.addEventListener("change", async e => {
    imageFileToUpload = e.target.files[0];
    const base64Url = await READ_IMAGE_FILE_AS_DATA_URL(imageFileToUpload);
    imagePreviewElt.src = base64Url
})
signupFormElt.style.display = "none";

QS("#switch-login-signup-input").addEventListener("change", e => {
    if (e.target.checked) {
        signupFormElt.style.display = "flex";
        loginFormElt.style.display = "none";
    } else {
        loginFormElt.style.display = "flex";
        signupFormElt.style.display = "none";
    }
});

// syntaxe async / await
// QS("form").addEventListener("submit", async e => {
//     e.preventDefault();
//     const result = await authService.signUp(emailInputElt.value, pwdInputElt.value);
//     console.log(result);
// });

// syntaxe .then().catch()
signupFormElt.addEventListener("submit", e => {
    e.preventDefault();
    authService.signUp(signupEmailInputElt.value, signupPwdInputElt.value).then(result => {
        if (result.error) {
            toast.open(result.error.frenchMessage);
        } else {
            const uid = result.data.uid;
            const userPath = `users/${uid}`;
            const user = {
                firstname: firstnameInputElt.value,
                lastname: lastnameInputElt.value,
                username: usernameInputElt.value,
                registerDate: Date.now(),
                uid: uid,
                imageUrl: userPath
            };
            databaseService.writeData(userPath, user);
            storageService.uploadFile(userPath, imageFileToUpload);
        }
    });
});

loginFormElt.addEventListener("submit", e => {
    e.preventDefault();
    authService.login(loginEmailInputElt.value, loginPwdInputElt.value).then(result => {
        if (result.error) {
            toast.open(result.error.frenchMessage);
        } else {
            const toStore = {
                accessToken: result.data.accessToken,
                uid: result.data.uid
            };

            localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(toStore));
            // document.location.href = "./profile.html";
        }
    });
});


