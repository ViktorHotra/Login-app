import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/user';

export const Register = () => {
    // const [isRegistered, setIsRegistered] = useState(false);

    const formValues = {
        email: '',
        password: '',
        confirm: '',
        isSober: false,
    };

    const [formState, setFormState] = useState(formValues);

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const inputHandler = (ev, value) => {
        setFormState({ ...formState, ...{ [value]: ev.target.value } });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:3500/api/register', {
                email: formState.email,
                password: formState.password,
                confirm: formState.confirm,
                isSober: formState.isSober,
            })
            .then((response) => {
                if (response.data.success) {
                    setUser(response.data);

                    navigate('/');
                }
            })
            .catch((error) => console.log(error));
        setFormState({ ...formValues });
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <legend className="fw-bold fs-4">Sign up</legend>
                <div className="input-group">
                    <label className="form-text" htmlFor="email floatingInput">
                        Email
                    </label>
                    <input
                        autoComplete="off"
                        type="text"
                        name="email"
                        value={formState.email}
                        onInput={(ev) => inputHandler(ev, 'email')}
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
                        value={formState.password}
                        onInput={(ev) => inputHandler(ev, 'password')}
                    />
                </div>

                <div className="input-group">
                    <label className="form-text" htmlFor="confirmPassword">
                        Confirm password
                    </label>
                    <input
                        autoComplete="off"
                        type="password"
                        name="confirmPassword"
                        value={formState.confirm}
                        onInput={(ev) => inputHandler(ev, 'confirm')}
                    />
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="adult"
                        checked={formState.isSober}
                        onChange={() => setFormState({ ...formState, isSober: !formState.isSober })}
                    />
                    <label className="form-text checkbox-label " htmlFor="adult">
                        I'm sober and ready to sell my soul to the devil
                    </label>
                </div>

                <input type="submit" className="btn btn-secondary" value="Submit" />
                <p className="form-text">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    );
};
