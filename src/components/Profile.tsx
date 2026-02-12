import { Link, useNavigate } from "react-router";
import { useAuth } from "../utilities/AuthContext";
import { useState } from "react";
import type Account from "../types/account";
import { createAccount } from "../services/accountService";
import { deleteClient } from "../services/clientService";

const Profile = () => {
    const { auth, logout } = useAuth();
    const [show, setShow] = useState(false);
    const [showType, setShowType] = useState(false);
    const nav = useNavigate()

    const handleCreateDebitAcc = async ()=>{
        const newAcc :Account = {
            type: 'debit',
            clientId: auth._id,
            balance: 0,
            createdAt: new Date(),
            transactions: []
        }
        try{
            const data = await createAccount(newAcc)
            nav(`/account-details/${data._id}`)
        }catch(err){
            console.log(err);
        }
    }
    const handleCreateCreditAcc = async ()=>{
        const newAcc :Account = {
            type: 'credit',
            clientId: auth._id,
            balance: 0,
            createdAt: new Date(),
            transactions: []
        }
        try{
            const data = await createAccount(newAcc)
            nav(`/account-details/${data._id}`)
        }catch(err){
            console.log(err);
        }
    }

    const handleDeleteClient = async ()=>{
        const cnfr = confirm('are you sure you want to permenetly delete this client ?')
        if(!cnfr) return
        try{
            await deleteClient(auth._id)
            logout()
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div className='absolute top-5 right-5 z-20'>
            {auth ? (
                <div className='flex flex-col relative'>
                    <img
                        className='w-20 h-20 rounded-full'
                        onClick={() => setShow(!show)}
                        src='https://img.freepik.com/vecteurs-premium/modele-conception-plate-icone-personne-illustration-vectorielle-signe-avatar-isole_109161-1680.jpg?semt=ais_hybrid&w=740&q=80'
                    />
                    {show && (
                        <div className='flex flex-col w-45 border border-gray-300 rounded-2xl absolute top-15 right-0 bg-white'>
                            <Link to='/profile' className='hover:bg-gray-200 p-2 rounded-t-2xl'><i className="fa-regular fa-user"></i>{auth.name}</Link>
                            <div className='border border-gray-300'></div>
                            <Link to='/' className='hover:bg-gray-200 p-2'><i className="fa-regular fa-credit-card"></i>Accounts</Link>
                            <div className='border border-gray-300'></div>
                            <div className='hover:bg-gray-200 p-2 relative'>
                                <span onClick={() => setShowType(!showType)}> <i className="fa-solid fa-folder-plus"></i>create new account</span>
                                {showType && (
                                    <div className='absolute right-44 top-0 translate-y-[-25%] border border-gray-300 rounded-lg'>
                                        <button onClick={handleCreateCreditAcc} className='hover:bg-gray-200 p-2 cursor-pointer rounded-t-lg w-20'><i className="fa-regular fa-credit-card"></i>credit</button>
                                        <div className='border border-gray-300'></div>
                                        <button onClick={handleCreateDebitAcc} className='hover:bg-gray-200 cursor-pointer p-2 rounded-b-lg w-20'><i className="fa-solid fa-credit-card"></i>debit</button>
                                    </div>
                                )}
                            </div>
                            <div className='border border-gray-300'></div>
                            <button onClick={logout}  className='hover:bg-gray-200 p-2 text-start'><i className="fa-solid fa-arrow-right-from-bracket"></i>logout</button>
                            <div className='border border-gray-300'></div>
                            <button onClick={handleDeleteClient} className='hover:bg-red-200 cursor-pointer p-2 rounded-b-2xl text-start'>
                                <i className="fa-solid fa-user-xmark"></i>delete client
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex gap-3'>
                    <Link className='p-2 hover:bg-gray-200 transition-all rounded-full' to='/login'>
                        login
                    </Link>
                    <Link className='p-2 hover:bg-gray-200 transition-all rounded-full' to='/register'>
                        register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Profile;
