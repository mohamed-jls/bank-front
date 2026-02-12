import { Link } from "react-router-dom";
import { useAuth } from "../utilities/AuthContext";
import { useRef, useState } from "react";
import type Client from "../types/client";
import { updateClient } from "../services/clientService";

const ClientPage = () => {
    const { auth, login } = useAuth();

    const [profile, setProfile] = useState<Client>(auth);
    const [err, setErr] = useState<string>("");
    const [showForm, setShowForm] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleEditProfile = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setErr("");
        if (!nameRef.current?.value || !emailRef.current?.value || !pwdRef.current?.value) return setErr("missing fields");
        try{
            const data = await updateClient(profile._id || "", profile);
            login(data.email, data.password)
        }catch(error){
            return setErr(error as string);
        }
        nameRef.current.value = "";
        emailRef.current.value = "";
        pwdRef.current.value = "";
        setShowForm(false);
    }

    if (!auth)
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-3xl text-center'>
                    you need to login first{" "}
                    <Link className='text-blue-600' to='/login'>
                        go to login →
                    </Link>
                </p>
            </div>
        );

    return (
        <div className='h-screen flex gap-10 p-10 bg-gray-50 text-lg items-center'>
            <div className='flex flex-col gap-4 w-1/2 items-center text-2xl'>
                <img
                    className='w-xs rounded-full h-80 object-cover'
                    src='https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                    alt=''
                />
                <p>{auth.name}</p>
                <p>{auth.email}</p>
                <button onClick={() => setShowForm(!showForm)} className='p-2 rounded-lg border-2 hover:bg-black hover:text-white transition-all '>
                    Edit profile
                </button>
            </div>
            <form className={`flex flex-col gap-4 w-sm p-10 bg-white rounded-lg shadow-lg ${!showForm && "invisible"}`}>
                <input type='text' name='name' value={profile.name} onChange={onChange} className='p-2 rounded-lg border border-gray-300' ref={nameRef} />
                <input type='email' name='email' value={profile.email} onChange={onChange} className='p-2 rounded-lg border border-gray-300' ref={emailRef} />
                <input type='password' name='password' value={profile.password} onChange={onChange} className='p-2 rounded-lg border border-gray-300' ref={pwdRef} />
                {err && <p className='p-2 rounded-lg border border-red-800 bg-red-200 text-red-800'>{err}</p>}
                <input onClick={handleEditProfile} type='submit' value='update profile' className='p-2 rounded-lg bg-black text-white hover:shadow-lg' />
            </form>
        </div>
    );
};

export default ClientPage;
