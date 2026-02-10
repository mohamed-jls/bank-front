import axios from "axios";
import type Client from "../types/client";

const baseUrl = import.meta.env.VITE_API_URL
const apiUrl = `${baseUrl}/clients`


export async function getClientById(id: string): Promise<Client>{
    try{
        const res = await axios.get<Client>(`${apiUrl}/${id}`)
        return res.data
    }catch(err){
        console.error(err);
        throw 'error fetching client'
    }
}
export async function getClientByEmailPwd(email: string, password: string): Promise<Client>{
    try{
        const res = await axios.get<Client[]>(`${apiUrl}/?email=${email}&password=${password}`)
        return res.data[0]
    }catch(err){
        console.error(err);
        throw 'invalid email or password'
    }
}
export async function createClient(client: Client): Promise<Client>{
    try{
        const res = await axios.post<Client>(apiUrl, client)
        return res.data
    }catch(err){
        console.error(err);
        throw 'error creating client'
    }
}
export async function updateClient(id: string, client: Client): Promise<Client>{
    try{
        const res = await axios.put<Client>(`${apiUrl}/${id}`, client)
        return res.data
    }catch(err){
        console.error(err);
        throw 'error updating client'
    }
}
export async function deleteClient(id: string): Promise<{message: string}>{
    try{
        const res = await axios.delete<{message: string}>(`${apiUrl}/${id}`)
        return res.data
    }catch(err){
        console.error(err);
        throw 'error deleting client'
    }
}