import './App.css';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Provider } from './components/Provider/Provider';
import { Login, Home, NotFound, Register, ChangePassword } from './pages';

export const App = () => (
    <Provider>
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
    </Provider>
);
