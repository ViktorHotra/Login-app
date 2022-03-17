import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export const Register = ({inputHandler}) => {
    const [emailData, setEmailData] = useState('')
    const [passwordData, setPasswordData] = useState('')
    const [confirmData, setConfirmData] = useState('')
    const [checked, setChecked] = useState(false)

    return (
        <div className="form-wrapper">
            <form onSubmit={(event) => {
                event.preventDefault();
                axios.post('http://localhost:3500/api/register', {
                    email: emailData,
                    password: passwordData,
                    confirm: confirmData,
                    isSober: checked
                })
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error))
            }

            }>
            <legend className="fw-bold fs-4">Sign up</legend>
            <div className="input-group">
                <label className="form-text" htmlFor="email floatingInput">Email</label>
                <input autoComplete="off" type="text" name='email' value={emailData} onInput={(ev) => inputHandler(ev, setEmailData)}/>
            </div>

            <div className="input-group">
                <label className="form-text" htmlFor="password">Password</label>
                <input autoComplete="off" type="password" name="password" value={passwordData} onInput={(ev) => inputHandler(ev, setPasswordData)}/>
            </div>

            <div className="input-group">
                <label className="form-text" htmlFor="confirmPassword">Confirm password</label>
                <input autoComplete="off" type="password" name="confirmPassword" value={confirmData} onInput={(ev) => inputHandler(ev, setConfirmData)}/>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="adult" checked={checked} onChange={() => setChecked(!checked)}/>
                <label className="form-text checkbox-label " htmlFor="adult">I'm sober and ready to sell my soul to
                    the devil</label>
            </div>

            <input type="submit" className="btn btn-secondary" value="Submit"/>
            <p className="form-text">Already have an account? <Link to="/login">Sign in</Link></p>

        </form>
    </div>
    )
}
