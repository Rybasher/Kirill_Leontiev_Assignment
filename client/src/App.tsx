import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {LayoutComponent} from './components/Layout/Layout';
import UserLogin from "./pages/UserLogin/UserLogin";
import User from "./pages/User/User";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import {UserRegistration} from "./pages/UserRegistration/UserRegistration";

function App() {
 
    return (
        <Routes>
            <Route path={'/'} element={<LayoutComponent/>}>
                <Route path={'*'} element={<UserLogin />}></Route>
                <Route path={'/auth/login'} element={<UserLogin />}></Route>
                <Route path={'/auth/registration'} element={<UserRegistration />}></Route>
                <Route path={'/user/:id'} element={<User />}></Route>
                <Route path={'/user/:id/statistics'} element={<StatisticsPage />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
