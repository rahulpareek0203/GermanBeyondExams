import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    
    const [user, setUser] = useState(null);

    // Load user from localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    // Login function
    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return(

        <AuthContext.Provider value = {{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

    
}

// custom hook
export function useAuth() {
    return useContext(AuthContext)
}