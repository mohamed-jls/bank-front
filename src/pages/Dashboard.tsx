import { useEffect, useState } from "react";
import type Account from "../types/account";
import { getAccountsByClientId } from "../services/accountService";
import { useAuth } from "../utilities/AuthContext";
import AccountCard from "../components/AccountCard";

const Dashboard = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [err, setErr] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const { auth } = useAuth();

    useEffect(() => {
        getAccountsByClientId(auth._id)
            .then((data) => setAccounts(data))
            .catch((error) => setErr(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>loading ...</p>;
    if (err) return <p>{err}</p>;

    return (
        <div className='p-10 flex gap-6'>
            {accounts.map((a) => (
                <AccountCard account={a} key={a._id} />
            ))}
        </div>
    );
};

export default Dashboard;
