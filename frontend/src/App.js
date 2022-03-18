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
    const inputHandler = (ev, setState) => {
        setState(ev.target.value)
    }

    function RequireAuth({children}) {
        if (!auth) {
            return <Navigate to="/login"/>;
        }
        return children
    }

    return <>
        <Routes>
            <Route path="/login" element={<Login inputHandler={inputHandler}/>}/>
            <Route path="/register" element={<Register inputHandler={inputHandler}/>}/>

            <Route path="/" element={
                <RequireAuth>
                    <Home inputHandler={inputHandler}/>
                </RequireAuth>
            }/>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>
}




