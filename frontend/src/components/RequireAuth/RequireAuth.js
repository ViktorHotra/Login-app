import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user';

export function RequireAuth({ children }) {
    const { user } = useContext(UserContext);
    if (!user.token) {
        return <Navigate to="/login" />;
    }
    return children;
}
