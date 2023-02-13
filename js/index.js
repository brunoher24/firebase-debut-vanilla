import _ from "./firebase-helper/init.js";
import { signUp, login } from "./firebase-helper/auth.js";



function QS(selector) {
    return document.querySelector(selector);
}
const loginFormElt = QS("#login-form");
const loginEmailInputElt = QS("#login-email-input");
const loginPwdInputElt = QS("#login-pwd-input");

const signupFormElt = QS("#signup-form");
const signupEmailInputElt = QS("#signup-email-input");
const signupPwdInputElt = QS("#signup-pwd-input");
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
        console.log(result);
    });
});

loginFormElt.addEventListener("submit", e => {
    e.preventDefault();
    login(loginEmailInputElt.value, loginPwdInputElt.value).then(result => {
        console.log(result);
    });
});


