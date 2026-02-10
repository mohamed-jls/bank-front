import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AccountDetails from "./pages/AccountDetails";

function App() {
    return (
        <div>
            <Routes>
                <Route index element={<Dashboard/>} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/account-details/:id' element={<AccountDetails/>}/>
            </Routes>
        </div>
    );
}

export default App;
