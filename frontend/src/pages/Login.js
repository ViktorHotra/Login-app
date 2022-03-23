import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {inputHandler} from '../utils/inputHandler'

export const Login = () => {
    const [emailData, setEmailData] = useState('')
    const [passwordData, setPasswordData] = useState('')

    return (
        <div className="form-wrapper">
            <form onSubmit={(event) => {
                event.preventDefault();
                axios.post('http://localhost:3500/api/login', {
                    email: emailData,
                    password: passwordData
                })
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error))
                setEmailData('')
                setPasswordData('')
            }

            }>
                <legend className="fw-bold fs-4">Sign in</legend>
                <div className="input-group">
                    <label className="form-text" htmlFor="email floatingInput">Email</label>
                    <input autoComplete="off" type="text" name='email' value={emailData}
                           onInput={(ev) => inputHandler(ev, setEmailData)}/>
                </div>

                <div className="input-group">
                    <label className="form-text" htmlFor="password">Password</label>
                    <input autoComplete="off" type="password" name="password" value={passwordData}
                           onInput={(ev) => inputHandler(ev, setPasswordData)}/>
                </div>

                <input type="submit" className="btn btn-secondary" value="Submit"/>
                <p className="form-text">Don't have an account? <Link to="/register">Register now</Link></p>
            </form>
        </div>
    )
}
