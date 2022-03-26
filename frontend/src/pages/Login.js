import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {inputHandler} from '../utils/inputHandler'
import {UserContext} from "../contexts/user";

export const Login = () => {
    const [emailData, setEmailData] = useState('')
    const [passwordData, setPasswordData] = useState('')

    const {setUser} = useContext(UserContext)

    let navigate = useNavigate();

    return (
        <div className="form-wrapper">
            <form onSubmit={(event) => {
                event.preventDefault();

                axios.post('http://localhost:3500/api/login', {
                    email: emailData,
                    password: passwordData
                })
                    .then(response => {
                        setUser(response.data)
                        navigate("/")
                    })
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
