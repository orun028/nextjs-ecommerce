import { createContext, useContext, useState } from "react";
import { AuthService } from '@/lib/firebase'

export const AuthContext = createContext(null);

export function AuthProvider(props: any){
    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<any>(null)

    const loginWithGoogle = async () => {
        const data = await AuthService.loginWithGoogle();
        setUser(data.user ?? null)
        setError(data.error ?? null)
    }

    const logout = () => {
        AuthService.logout();
        setUser(null)
    }
    const value = { user, error, loginWithGoogle, logout, setUser }

    return <AuthContext.Provider value={value} {...props}/> 
}

export default function useAuth(){ 
    return useContext(AuthContext);
}