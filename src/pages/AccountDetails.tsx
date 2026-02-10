import { useParams } from "react-router";
import type Account from "../types/account";
import { useEffect, useState } from "react";
import { getAccountById } from "../services/accountService";

const AccountDetails = () => {
    const { id } = useParams();

    const [account, setAccount] = useState<Account>();
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        if (!id) return setErr("id not found");
        getAccountById(id)
            .then((data) => setAccount(data))
            .catch((error) => setErr(error));
    }, []);

    if (!account) return <p>loading ...</p>;
    if(err) return <p>{err}</p>

    return (
        <div>
            <p>{account._id}</p>
            <p>client num: {account.clientId}</p>
            <p className='text-2xl'>{account.balance} TND</p>
            <p className='p-2 rounded bg-amber-800 text-white text-lg absolute top-2 right-2'>{account.type}</p>
            <div className='flex flex-col gap-1 '>
                {account.transactions.map((t) => (
                    <p className={`${t.from == account._id ? "text-red-700" : "text-green-700"} text-sm`}>{`${t.from == account._id ? "↑" : "↓"} ${t.amount}`}</p>
                ))}
            </div>
        </div>
    );
};

export default AccountDetails;
