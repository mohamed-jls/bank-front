import { useParams } from "react-router";
import type Account from "../types/account";
import { useEffect, useRef, useState } from "react";
import { getAccountById, makeTransaction, updateAccount } from "../services/accountService";
import { useAuth } from "../utilities/AuthContext";

const AccountDetails = () => {
    const { id } = useParams();
    const { auth } = useAuth();

    const [account, setAccount] = useState<Account>();
    const [err, setErr] = useState<string>("");
    const [showTopup, setShowTopup] = useState(false);
    const [showTrans, setShowTrans] = useState(false);

    const topupRef = useRef<HTMLInputElement>(null);
    const accRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!id) return setErr("id not found");
        getAccountById(id)
            .then((data) => setAccount(data))
            .catch((error) => setErr(error));
    }, []);

    if (!account) return <p>loading ...</p>;
    if (err) return <p>{err}</p>;

    const handleTopUp = async () => {
        if (!topupRef.current?.value) return setErr("missing value");
        const data = await updateAccount(account._id || "", {
            ...account,
            balance: account.balance + Number(topupRef.current.value),
        });
        setAccount(data);
        topupRef.current.value = "";
        setShowTopup(false);
    };

    const handleTransfer = async () => {
        if (!accRef.current?.value || !amountRef.current?.value) return setErr("missing reciever");
        accRef.current.classList.remove("border-red-800");
        try {
            await makeTransaction(account._id || "", accRef.current.value, Number(amountRef.current.value || 0));
            setAccount({ ...account, balance: account.balance - Number(amountRef.current.value) });
            accRef.current.value = "";
            amountRef.current.value = "";
            setShowTrans(false);
        } catch {
            accRef.current.classList.add("border-red-800", 'border-2');
        } 
    };

    return (
        <div className='flex justify-center items-center h-screen relative'>
            <div className='flex h-150 w-xl border-2 border-gray-400 flex-col p-10 gap-4 text-2xl rounded-2xl'>
                <p className='text-center font-bold'>{account._id}</p>
                <p>client num: {account.clientId}</p>
                <p>client : {auth.name}</p>
                <p className='text-2xl text-green-700'>{account.balance} TND</p>
                <p className='p-2 rounded bg-amber-800 text-white'>{account.type}</p>
                <p>transactions: </p>
                {account.transactions.length == 0 ? (
                    <p className='text-center text-yellow-500 '>no transactions yet</p>
                ) : (
                    <div className='flex flex-col gap-1 overflow-y-auto border border-gray-300 rounded-lg p-2'>
                        {account.transactions.map((t) => (
                            <p className={`${t.from == account._id ? "text-red-700" : "text-green-700"} text-base`}>{`${t.from == account._id ? "↑" : "↓"} ${t.amount}`}</p>
                        ))}
                    </div>
                )}
                <div className='flex gap-3 '>
                    <button onClick={() => setShowTrans(true)} className='p-2 rounded bg-gray-800 text-white text-lg'>
                        make a transaction
                    </button>
                    <button onClick={() => setShowTopup(true)} className='p-2 rounded bg-gray-800 text-white text-lg'>
                        top up
                    </button>
                </div>
            </div>
            {showTopup && (
                <div className='absolute flex flex-col gap-2 bg-white p-8 w-xs rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border'>
                    <button className='absolute top-1 right-1' onClick={() => setShowTopup(false)}>
                        ❌
                    </button>
                    <input className='p-2 rounded border' type='number' min={0} ref={topupRef} />
                    <button onClick={handleTopUp} className='p-2 rounded bg-gray-800 text-white text-lg'>
                        top up
                    </button>
                </div>
            )}
            {showTrans && (
                <div className='absolute flex flex-col gap-2 bg-white p-8 w-xs rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border'>
                    <button className='absolute top-1 right-1' onClick={() => setShowTrans(false)}>
                        ❌
                    </button>
                    <input className='p-2 rounded border' type='text' placeholder='reciever num' ref={accRef} />
                    <input className='p-2 rounded border' type='number' placeholder='amount' min={0} ref={amountRef} />
                    <button onClick={handleTransfer} className='p-2 rounded bg-gray-800 text-white text-lg'>
                        transfer
                    </button>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;
