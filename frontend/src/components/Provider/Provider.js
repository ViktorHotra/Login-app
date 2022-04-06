import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/user';

export const Provider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const onLogIn = useCallback(
        (data) => {
            axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            try {
                localStorage.setItem('token', data.token);
            } catch (e) {
                throw new Error(`LocalStorage isn't available`);
            }
            setUser(data);
        },
        [setUser]
    );

    const onLogOut = useCallback(() => {
        axios.defaults.headers.common.Authorization = '';
        try {
            localStorage.removeItem('token');
        } catch (e) {
            throw new Error(`LocalStorage isn't available`);
        }
        setUser({});
    }, [setUser]);

    const memoValue = useMemo(
        () => ({
            user,
            onLogIn,
            onLogOut,
        }),
        [user, onLogIn, onLogOut]
    );

    useEffect(() => {
        const sendData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await axios.get('http://localhost:3500/api/reload', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    onLogIn(data);
                } catch (e) {
                    console.log(e);
                }
            }
            setIsLoading(false);
        };
        sendData();
    }, [onLogIn]);

    return isLoading ? (
        <p>Wait, data is loading...</p>
    ) : (
        <UserContext.Provider value={memoValue}>{children}</UserContext.Provider>
    );
};
