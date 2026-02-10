import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../utilities/AuthContext";


const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const [err, setErr] = useState('')
    const nav = useNavigate()

    const {login} = useAuth()

    const handleLogin = async (e: {preventDefault: ()=>void})=> {
        e.preventDefault()
        setErr('')
        if(!emailRef.current?.value || !pwdRef.current?.value) return setErr('missing values')

        try{
            await login(emailRef.current.value, pwdRef.current.value)
            nav('/')
        }catch(err){
            setErr(err as string)
        }

    }

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-gray-100">
            <h1 className="text-5xl font-bold p-4">LOGIN</h1>
            <form className="flex flex-col p-8 rounded-lg bg-white w-sm gap-3 border-2 border-gray-300 text-lg">
                <input type='email' placeholder='email' ref={emailRef} className="p-2 border border-black rounded-lg"/>
                <input type='password' placeholder='password' ref={pwdRef} className="p-2 border border-black rounded-lg"/>
                {err && <p className="p-2 border border-red-800 text-red-800 bg-red-200 rounded-lg">{err}</p>}
                <input onClick={handleLogin} type='submit' value='Login'  className="p-2 border border-black rounded-lg hover:bg-black hover:text-white"/>
                <p className="text-base p-1">don't have an account? <Link to='/register' className="text-blue-700 hover:underline">register now →</Link></p>
            </form>
        </div>
  )
}

export default Login