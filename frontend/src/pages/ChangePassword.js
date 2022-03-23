import {Link} from "react-router-dom";
import {useState} from "react";
import {inputHandler} from '../utils/inputHandler'

export const ChangePassword = () => {
    const [oldPassword, setOldPasswordData] = useState('')
    const [newPassword, setNewPasswordData] = useState('')
    const [confirmData, setConfirmData] = useState('')

    return (
        <div className="form-wrapper">
            <form>
                <legend className="fw-bold fs-4">Change password</legend>
                <div className="input-group">
                    <label className="form-text" htmlFor="oldPassword floatingInput">Old password</label>
                    <input autoComplete="off" type="password" name='oldPassword' value={oldPassword}
                           onInput={(ev) => inputHandler(ev, setOldPasswordData)}/>
                </div>

                <div className="input-group">
                    <label className="form-text" htmlFor="newPassword">New password</label>
                    <input autoComplete="off" type="password" name="newPassword" value={newPassword}
                           onInput={(ev) => inputHandler(ev, setNewPasswordData)}/>
                </div>

                <div className="input-group">
                    <label className="form-text" htmlFor="confirmPassword">Confirm new password</label>
                    <input autoComplete="off" type="password" name="confirmPassword" value={confirmData}
                           onInput={(ev) => inputHandler(ev, setConfirmData)}/>
                </div>

                <input type="submit" className="btn btn-secondary" value="Submit"/>
                <p className="form-text">Already have an account? <Link to="/login">Sign in</Link></p>

            </form>
        </div>
    )
}
