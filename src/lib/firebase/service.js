import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const auth = getAuth();

const Service = {
    createUserWithEmail: async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return { user: userCredential.user };
        } catch (error) {
            const code = error.code;
            const message = error.message;
            return { error: { code, message } };
        }
    },
    loginWithEmail: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { user: userCredential.user };
        } catch (error) {
            const code = error.code;
            const message = error.message;
            return { error: { code, message } };
        }
    },
    loginWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return { user: result.user };
        } catch (error) {
            const code = error.code;
            const message = error.message;
            return { error: { code, message } };
        }
    },
    loginWithFacebook: async () => {
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return { user: result.user };
        } catch (error) {
            const code = error.code;
            const message = error.message;
            return { error: { code, message } };
        }
    },
    logout: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            const code = error.code;
            const message = error.message;
            return { error: { code, message } };
        }
    }
}

export default Service;