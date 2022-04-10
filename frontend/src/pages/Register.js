import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/user';
import { signUpSchema } from '../validation';

export const Register = () => {
    const formValues = {
        email: '',
        password: '',
        confirm: '',
        isSober: false,
    };

    const formErrorsMsg = {
        email: '',
        password: '',
        confirm: '',
    };

    const [formState, setFormState] = useState(formValues);
    const [errorMsg, setErrorMsg] = useState(formErrorsMsg);

    const { onLogIn } = useContext(UserContext);

    const navigate = useNavigate();

    const inputHandler = (ev, value) => {
        setFormState({ ...formState, ...{ [value]: ev.target.value } });
    };

    const sendData = async (data) => {
        try {
            const response = await axios.post('http://localhost:3500/api/register', data);
            if (!response.data.success) {
                setErrorMsg({ ...errorMsg, email: response.data.message });
            } else if (response.data.success) {
                onLogIn(response.data);
                navigate('/');
                // return;
            }
        } catch (e) {
            console.log(e);
        }
        // await setFormState({ ...formValues });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await signUpSchema.validate(formState, {
                abortEarly: false,
            });
            await sendData(data);
        } catch (e) {
            if (e.name === 'ValidationError' && e.inner) {
                const errorsObj = e.inner.reduce(
                    (errors, { path, message }) => ({
                        ...errors,
                        [path]: message,
                    }),
                    {}
                );
                setErrorMsg(errorsObj);
            }
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <legend className="fw-bold fs-4">Sign up</legend>
                <div className="input-group">
                    <label className="form-text" htmlFor="email floatingInput">
                        {errorMsg.email !== '' ? <span className="err-text">{errorMsg.email}</span> : 'Email'}
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
                        {errorMsg.password !== '' ? <span className="err-text">{errorMsg.password}</span> : 'Password'}
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
                        {errorMsg.confirm !== '' ? (
                            <span className="err-text">{errorMsg.confirm}</span>
                        ) : (
                            'Confirm password'
                        )}
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
