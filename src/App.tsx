import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AccountDetails from "./pages/AccountDetails";
import Profile from "./components/Profile";
import Client from "./pages/Client";

function App() {
    return (
        <div>
            <Profile/>
            <Routes>
                <Route index element={<Dashboard/>} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/profile' element={<Client/>} />
                <Route path='/account-details/:id' element={<AccountDetails/>}/>
            </Routes>
        </div>
    );
}

export default App;
