import useAuth from "hook/auth";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth();
export default function AuthStateChanged({ children }) {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        });
        //eslint-disable-next-line
    }, [])

    if (loading) return <p>Loading...</p>
    return children
}