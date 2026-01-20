import React, {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
const [isAuth, toggleIsAuth] = useState(false);


    const data = {
        isAuth: toggleIsAuth,
    }

    if (isAuth === true) {
        console.log ('test 1');
    } else {
        console.log('test 2');
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;