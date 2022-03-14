import React from "react";
import './App.css';
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import {Login, Home, NotFound, Register} from './pages'

export const App = () => {
    const auth = true

    function RequireAuth({children}) {
        if (!auth) {
            return <Navigate to="/login"/>;
        }
        return children
    }

    return <>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/" element={
                <RequireAuth>
                    <Home/>
                </RequireAuth>
            }/>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>
}




