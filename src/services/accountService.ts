import axios from "axios";
import type Account from "../types/account";

const baseUrl = import.meta.env.VITE_API_URL
const apiUrl = `${baseUrl}/accounts`

export async function getAccountById(id: string): Promise<Account>{
    try{
        const res = await axios.get<Account>(`${apiUrl}/${id}`)
        return res.data
    }catch(err){
        console.error(err);
        throw 'error fetching account'
    }
}
export async function getAccountsByClientId(clientId: string): Promise<Account[]>{
    try{
        const res = await axios.get<Account[]>(`${apiUrl}/by-client/${clientId}`)
        return res.data
    }catch(err){
        console.error(err);
        throw 'error fetching accounts'
    }
}
export async function createAccount(account: Account): Promise<Account>{
    try{
        const res = await axios.post<Account>(apiUrl, account)
        return res.data
    }catch(err){
        console.error(err);
        throw 'error creating account'
    }
}
export async function updateAccount(id: string, account: Account): Promise<Account>{
    try{
        const res = await axios.put<Account>(`${apiUrl}/${id}`, account)
        return res.data
    }catch(err){
        console.error(err);
        throw 'error updating account'
    }
}
export async function deleteAccount(id: string): Promise<{message: string}>{
    try{
        const res = await axios.delete<{message: string}>(`${apiUrl}/${id}`)
        return res.data
    }catch(err){
        console.error(err);
        throw 'error deleting account'
    }
}