import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import type Client from "../types/client";
import { useAuth } from "../utilities/AuthContext";

const Register = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const [err, setErr] = useState('')
    const nav = useNavigate()

    const {register} = useAuth()

    const handleRegister = async (e: {preventDefault: ()=>void}) =>{
        e.preventDefault()
        setErr('')
        if(!nameRef.current?.value || !emailRef.current?.value || !pwdRef.current?.value) return setErr('missing values')
        const newClient: Client = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: pwdRef.current.value
        }
        try{
            await register(newClient)
            nav('/login')
        }catch(err){
            setErr(err as string)
        }
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen bg-gray-100">
            <h1 className="text-5xl font-bold p-4">REGISTER</h1>
            <form className="flex flex-col p-8 rounded-lg bg-white w-sm gap-3 border-2 border-gray-300 text-lg">
                <input type='text' placeholder='name' ref={nameRef} className="p-2 border border-black rounded-lg"/>
                <input type='email' placeholder='email' ref={emailRef} className="p-2 border border-black rounded-lg"/>
                <input type='password' placeholder='password' ref={pwdRef} className="p-2 border border-black rounded-lg"/>
                {err && <p className="p-2 border border-red-800 text-red-800 bg-red-200 rounded-lg">{err}</p>}
                <input onClick={handleRegister} type='submit' value='Register'  className="p-2 border border-black rounded-lg hover:bg-black hover:text-white"/>
                <p className="text-base p-1">already have an account? <Link to='/login' className="text-blue-700 hover:underline">login now →</Link></p>
            </form>
        </div>
    );
};

export default Register;
