import _ from "./firebase-helper/init.js";

import storageService from "./firebase-helper/storage.js";
import databaseService from "./firebase-helper/database.js";
import authService from "./firebase-helper/auth.js";
import Toast from "./services/MyToast.js";
import { LOCAL_STORAGE_NAME } from "./global.js";


const authInfos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

const toast = new Toast();
const emailFormElt = QS("#email-form");
const emailFormSubmitButton = QS("#email-form input[type='submit']")
const profileFormElt = QS("#profile-form");
const emailInputElt = QS("#email-input");
const newPwdInputElt = QS("#new-pwd-input");
const firstnameInputElt = QS("#firstname-input");
const lastnameInputElt = QS("#lastname-input");
const usernameInputElt = QS("#username-input");
const imageInputElt = QS("#change-image-file-input");
const imagePreviewElt = QS("#img-preview");
const reAuthenticateFormPrompt = QS("#re-authenticate-form-prompt");
const currentPasswordInput = QS("#current-password");

let imageFileToUpload, currentUserEmail, currentUserInfos, showEmailSubmitButton = false;

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
    });
}

function getUserEmail(user) {
    if(user) {
        emailInputElt.value = user.email;
        currentUserEmail = user.email;
    } else {
        toast.open("Récupération de l'adresse mail impossible. Verifiez que vous êtes bien connecté.e.");
    } 
}

function displayReauthenticateForm () {
    reAuthenticateFormPrompt.className = "appear-bottom";
}



function validateProfileModifications () {
    let messages = "";
    if(imageFileToUpload) {
        storageService.uploadFile(`users/${authInfos.uid}`, imageFileToUpload);
        messages += "Image modifiée";
    }
    if(newPwdInputElt.value.trim().length > 5) {
        authService.updateUserPassword(newPwdInputElt.value);
        messages += "\n Mot de passe modifié";
    }

    let updates = {};
    if(firstnameInputElt.value !== currentUserInfos.firstname && firstnameInputElt.value.trim().length > 1) {
        updates["firstname"] = firstnameInputElt.value;
    }
    if(lastnameInputElt.value !== currentUserInfos.lastname && lastnameInputElt.value.trim().length > 1) {
        updates["lastname"] = lastnameInputElt.value;
    }
    if(usernameInputElt.value !== currentUserInfos.username && usernameInputElt.value.trim().length > 1) {
        updates["username"] = usernameInputElt.value;
    }

    if(Object.keys(updates).length > 0) {
        databaseService.updateData(`users/${authInfos.uid}`, updates).then(result => {
            if(!result.error) {
                messages += "\n Info(s) profile modifiée(s)";
            }
            toast.open(messages);
        });
    } else if(messages.length > 0) {
        toast.open(messages);
    }
}

imageInputElt.addEventListener("change", async e => {
    imageFileToUpload = e.target.files[0];
    const base64Url = await READ_IMAGE_FILE_AS_DATA_URL(imageFileToUpload);
    imagePreviewElt.src = base64Url
});

emailInputElt.addEventListener("input", e => {
    console.log(emailInputElt.value);
    if(!showEmailSubmitButton && currentUserEmail && emailInputElt.value !== currentUserEmail) {
        emailFormSubmitButton.style.display = "block";
        showEmailSubmitButton = true;
    } else if(showEmailSubmitButton && currentUserEmail && emailInputElt.value === currentUserEmail) {
        emailFormSubmitButton.style.display = "none";
        showEmailSubmitButton = false;
    }
});

emailFormElt.addEventListener("submit", e => {
    e.preventDefault();
    if(currentUserEmail && emailInputElt.value) {
        authService.updateUserEmail(emailInputElt.value).then(result => {
            console.log(result);
            location.href = "./index.html?emailModifie=oui";            
        });
    }
});

profileFormElt.addEventListener("submit", e => {
    e.preventDefault();
    if(!currentUserEmail) {
        return;
    } else {
        displayReauthenticateForm();
    }
});

// récupération de l'adresse mail
authService.getCurrentAuthState(getUserEmail);

// récupération de l'image de profil 
storageService.downloadFile(`users/${authInfos.uid}`).then(result => {
    if(result.error) {
        toast.open("Erreur lors du chargement de votre image de profil !");
    } else {
        imagePreviewElt.src = result.data.url;
    }
});

// récupération des autres infos
databaseService.readData(`users/${authInfos.uid}`, userInfos => {
    console.log(userInfos);
    currentUserInfos = {...userInfos};
    firstnameInputElt.value = userInfos.firstname;
    lastnameInputElt.value = userInfos.lastname;
    usernameInputElt.value = userInfos.username;
});

reAuthenticateFormPrompt.addEventListener("submit", e => {
    e.preventDefault();
    console.log(currentUserEmail, currentPasswordInput.value);
    authService.login(currentUserEmail, currentPasswordInput.value).then(result => {
        if(!result.error) {
            e.target.className = "disappear-bottom";
            validateProfileModifications();
        } else {
            toast.open("une erreur est survenue !");
        }
    });
   
});

