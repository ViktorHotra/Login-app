import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { inputHandler } from '../utils/inputHandler';
import { UserContext } from '../contexts/user';

export const Login = () => {
    const [emailData, setEmailData] = useState('');
    const [passwordData, setPasswordData] = useState('');
    const [msg, setMsg] = useState(null);

    const { setUser, onLogIn } = useContext(UserContext);

    const navigate = useNavigate();

    return (
        <div className="form-wrapper">
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    axios
                        .post('http://localhost:3500/api/login', {
                            email: emailData,
                            password: passwordData,
                        })
                        .then((response) => {
                            if (response.data.status === 200) {
                                onLogIn(response.data);
                                navigate('/');
                            } else if (response.data.status === 400) {
                                setMsg(response.data.message);
                            }
                        })
                        .catch((error) => console.log(error));
                    setEmailData('');
                    setPasswordData('');
                }}
            >
                <legend className="fw-bold fs-4">Sign in</legend>
                <p className="message">{msg}</p>
                <div className="input-group">
                    <label className="form-text" htmlFor="email floatingInput">
                        Email
                    </label>
                    <input
                        autoComplete="off"
                        type="text"
                        name="email"
                        value={emailData}
                        onInput={(ev) => inputHandler(ev, setEmailData)}
                    />
                </div>

                <div className="input-group">
                    <label className="form-text" htmlFor="password">
                        Password
                    </label>
                    <input
                        autoComplete="off"
                        type="password"
                        name="password"
                        value={passwordData}
                        onInput={(ev) => inputHandler(ev, setPasswordData)}
                    />
                </div>

                <input type="submit" className="btn btn-secondary" value="Submit" />
                <p className="form-text">
                    Don't have an account? <Link to="/register">Register now</Link>
                </p>
            </form>
        </div>
    );
};
