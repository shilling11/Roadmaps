import { useState, useEffect, useContext, createContext, type PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<{
    session: string | null;
    setSession: (value: string | null) => Promise<void>;
} | null>
(null);

export function useSession() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useSession must be used with session provider");
    }
    return context;
}

export function SessionAuth({ children }: PropsWithChildren) {
    const [session, setState] = useState<string | null>(null)

    const setSession = async (value: string | null) => {
        if (value) {
            await AsyncStorage.setItem('session_id', value);
        }
        else {
            await AsyncStorage.removeItem('session_id');
        }
        setState(value);
    }

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    )
}