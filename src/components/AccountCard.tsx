import { Link } from "react-router";
import type Account from "../types/account";

const AccountCard = ({ account }: { account: Account }) => {
    return (
        <div className='w-md h-48 border-2 border-gray-300 rounded-2xl p-6 relative flex flex-col'>
            <p className='text-lg text-gray-800'>client number : {account.clientId}</p>
            <p className='px-2 py-1 rounded bg-gray-800 text-white text-lg absolute top-2 right-2'>{account.type}</p>
            <p className='text-2xl'>{account.balance} TND</p>
            <div className='flex flex-col gap-1 overflow-y-auto flex-1 pr-1 border border-gray-300 rounded-lg'>
                {account.transactions.map((t) => (
                    <div>
                        <p key={t._id} className={`${t.from == account._id ? "text-red-700" : "text-green-700"} text-sm pl-3`}>
                            {`${t.from == account._id ? "↑" : "↓"} ${t.amount}`}
                        </p>
                        <div className='border border-gray-200 mx-2 my-0.5'></div>
                    </div>
                ))}
            </div>
            <Link to={`/account-details/${account._id}`} className='text-blue-700 hover:underline absolute right-4 bottom-1'>
                view details →
            </Link>
        </div>
    );
};

export default AccountCard;
