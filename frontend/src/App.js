import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Home, NotFound, Register, ChangePassword } from './pages';
import { UserContext } from './contexts/user';

export const App = () => {
    const [user, setUser] = useState({});

    function RequireAuth({ children }) {
        if (!user.token) {
            return <Navigate to="/login" />;
        }
        return children;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/change"
                    element={
                        <RequireAuth>
                            <ChangePassword />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserContext.Provider>
    );
};
