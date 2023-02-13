import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();

export const signUp = (email, pwd) => {
    return new Promise(resolve => {
        createUserWithEmailAndPassword(auth, email, pwd)
        .then(userCredential => {
            // Signed in 
            const user = userCredential.user;
            resolve({
                success: true,
                data: user
            });
        })
        .catch(error => {
            resolve({
                success: false,
                error
            });
        });
    }); 
};
