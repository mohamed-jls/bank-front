import { useEffect, useState } from "react";
import type Account from "../types/account";
import { getAccountsByClientId } from "../services/accountService";
import { useAuth } from "../utilities/AuthContext";
import AccountCard from "../components/AccountCard";
import { Link } from "react-router";

const Dashboard = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [err, setErr] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const { auth } = useAuth();

    useEffect(() => {
        if(!auth) return setLoading(false)
        getAccountsByClientId(auth._id)
            .then((data) => setAccounts(data))
            .catch((error) => setErr(error))
            .finally(() => setLoading(false));
    }, []);

    if(!auth) return <div className="flex justify-center items-center h-screen">
        <p className="text-3xl text-center">you need to login first <Link className="text-blue-600" to='/login'>go to login →</Link></p>
    </div>

    if (loading) return  <div className="flex justify-center items-center h-screen"><p className="text-3xl">loading ...</p></div>;
    if (err) return <div className="flex justify-center items-center h-screen"> <p className="text-3xl text-red-800">{err}</p></div>;

    return (
        <div className='p-10 flex flex-col gap-6'>
            {accounts.map((a) => (
                <AccountCard account={a} key={a._id} />
            ))}
        </div>
    );
};

export default Dashboard;
