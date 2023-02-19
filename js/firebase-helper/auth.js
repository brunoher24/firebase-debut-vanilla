import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
    from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();

const authService = {
    signUp(email, pwd) {
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
                    let frenchMessage;
                    switch (error.code) {
                        case "auth/invalid-email":
                            frenchMessage = "Adresse mail mal formatée"; break;
                        case "auth/weak-password":
                            frenchMessage = "Votre mot de passe doit contenir minimum 6 caractères"; break;
                        case "auth/email-already-in-use":
                            frenchMessage = "Cette adresse mail est déjà utilisée"; break;
                        default: frenchMessage = "Une erreur inconnue est survenue ! Code de l'erreur : " + error.code;
                    }
                    resolve({
                        success: false,
                        error: { ...error, frenchMessage }
                    });
                });
        });
    },

    login(email, pwd) {
        return new Promise(resolve => {
            signInWithEmailAndPassword(auth, email, pwd)
                .then(userCredential => {
                    // Signed in 
                    const user = userCredential.user;
                    resolve({
                        success: true,
                        data: user
                    });
                })
                .catch(error => {
                    let frenchMessage;
                    switch (error.code) {
                        case "auth/user-not-found":
                        case "auth/wrong-password":
                        case "auth/wrong-email":
                            frenchMessage = "Mot de passe et/ou adresse mail non reconnu.e.s"; break;
                        default: frenchMessage = "Une erreur inconnue est survenue ! Code de l'erreur : " + error.code;
                    }
                    resolve({
                        success: false,
                        error: { ...error, frenchMessage }
                    });
                });
        })

    }
}

export default authService;