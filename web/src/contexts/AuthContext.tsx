import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/api'

interface SignInResponse {
    user: User;
    token: string;
}

interface User {
    id: number;
    email: string;
    nome: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void | Error>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const storagedUser = localStorage.getItem('@PP:user')
        const storagedToken = localStorage.getItem('@PP:token')

        if (storagedToken && storagedUser) {
            api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`

            setUser(JSON.parse(storagedUser))
        }
    }, [])

    async function signIn(email: string, password: string): Promise<void | Error> {
        setLoading(true)
        try {
            const data = await api.post<SignInResponse>('/login', { email, password })
            setUser(data.data.user)
            api.defaults.headers['Authorization'] = `Bearer ${data.data.token}`

            localStorage.setItem('@PP:user', JSON.stringify(data.data.user))
            localStorage.setItem('@PP:token', data.data.token)
            return
        } catch (error) {
            return Promise.reject(`${error.response.data.error}`)
        } finally {
            setLoading(false)
        }
    }

    function signOut() {
        localStorage.clear()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
};