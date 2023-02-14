import _ from "./firebase-helper/init.js";
import databaseService from "./firebase-helper/database.js";
import { signUp, login } from "./firebase-helper/auth.js";
import Toast from "./services/MyToast.js";

function QS(selector) {
    return document.querySelector(selector);
}

const toast = new Toast();

const loginFormElt          = QS("#login-form");
const loginEmailInputElt    = QS("#login-email-input");
const loginPwdInputElt      = QS("#login-pwd-input");

const signupFormElt         = QS("#signup-form");
const signupEmailInputElt   = QS("#signup-email-input");
const signupPwdInputElt     = QS("#signup-pwd-input");
const firstnameInputElt     = QS("#signup-firstname-input");
const lastnameInputElt      = QS("#signup-lastname-input");
const usernameInputElt      = QS("#signup-username-input");

signupFormElt.style.display = "none";

QS("#switch-login-signup-input").addEventListener("change", e => {
    if(e.target.checked) {
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
//     const result = await signUp(emailInputElt.value, pwdInputElt.value);
//     console.log(result);
// });

// syntaxe .then().catch()
signupFormElt.addEventListener("submit", e => {
    e.preventDefault();
    signUp(signupEmailInputElt.value, signupPwdInputElt.value).then(result => {
        if(result.error) {
            toast.open(result.error.frenchMessage);
        } else {
            const uid = result.data.uid;
            databaseService.writeData(`users/${uid}`, {
                firstname: firstnameInputElt.value, 
                lastname: lastnameInputElt.value, 
                username: usernameInputElt.value,
                registerDate: Date.now(),
                uid: uid
            });
        }
    });
});

loginFormElt.addEventListener("submit", e => {
    e.preventDefault();
    login(loginEmailInputElt.value, loginPwdInputElt.value).then(result => {
        if(result.error) {
            toast.open(result.error.frenchMessage);
        }
    });
});


