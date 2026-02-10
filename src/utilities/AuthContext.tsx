import type Client from "../types/client";
import { createClient, getClientByEmailPwd } from "../services/clientService";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

const authContext = createContext<any>(null)

const AuthProvider = ({children}: {children: ReactNode})=>{

    const [auth, setAuth] = useState<Client | null>(()=> JSON.parse(localStorage.getItem('auth') || 'null'))

    useEffect(()=>{
        localStorage.setItem('auth', JSON.stringify(auth))
    }, [auth])

    const login = async (email: string, password: string): Promise<void>=>{
        try{
            const client: Client = await getClientByEmailPwd(email, password)
            setAuth(client)
        }catch(err){
            throw err
        }
    }

    const register = async (client: Client): Promise<void>=>{
        try{
            await createClient(client)
        }catch(err){
            throw err
        }
    }

    const logout = ()=> setAuth(null)

    return(
        <authContext.Provider value={{auth ,login, register, logout}}>
            {children}
        </authContext.Provider>
    )
}
export default AuthProvider

export const useAuth = (): any => useContext(authContext)