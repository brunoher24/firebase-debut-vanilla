import fbApp from "./firebase-helper/init.js";
import { signUp } from "./firebase-helper/auth.js";



function QS(selector) {
    return document.querySelector(selector);
}


console.log(fbApp);

const emailInputElt = QS("#email-input");
const pwdInputElt = QS("#pwd-input");

// syntaxte async / await
// QS("form").addEventListener("submit", async e => {
//     e.preventDefault();
//     const result = await signUp(emailInputElt.value, pwdInputElt.value);
//     console.log(result);
// });

// syntaxe .then().catch()
QS("form").addEventListener("submit", e => {
    e.preventDefault();
    signUp(emailInputElt.value, pwdInputElt.value).then(result => {
        console.log(result);
    });
});


