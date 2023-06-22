import PropTypes from "prop-types";
import { useState, createContext, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { auth } from "src/firebase";

const AuthContext = createContext();

const eligibleDomain = "@ecobees.net";

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({
    });
    const [domainError, setDomainError] = useState(false);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            hd: "ecobees.net"
        });

        signInWithPopup(auth, provider)
            .then((result) => {
                const { user } = result;
                const { email } = user;

                if (email.endsWith(eligibleDomain)) {
                    console.log("Eligible Domain");
                } else {
                    console.log("Domain is not eligible");
                    signOut(auth);
                    deleteUser(user);
                    setDomainError(true);
                }
            });
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{
            googleSignIn, logOut, user, domainError, eligibleDomain
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export { AuthContext };

AuthContextProvider.propTypes = {
    children: PropTypes.any
};