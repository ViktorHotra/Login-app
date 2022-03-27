import { useContext, useState } from 'react';
import axios from 'axios';
import { inputHandler } from '../utils/inputHandler';
import { UserContext } from '../contexts/user';

export const ChangePassword = () => {
    const [oldPassword, setOldPasswordData] = useState('');
    const [newPassword, setNewPasswordData] = useState('');
    const [confirmData, setConfirmData] = useState('');

    const { user } = useContext(UserContext);

    return (
        <div className="form-wrapper">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    axios
                        .post(
                            'http://localhost:3500/api/change',
                            {
                                oldPassword,
                                newPassword,
                                confirm: confirmData,
                            },
                            {
                                headers: { Authorization: `Bearer ${user.token}` },
                            }
                        )
                        .then((response) => console.log(response.data))
                        .catch((error) => console.log(error));
                    setOldPasswordData('');
                    setNewPasswordData('');
                    setConfirmData('');
                }}
            >
                <legend className="fw-bold fs-4">Change password</legend>
                <div className="input-group">
                    <label className="form-text" htmlFor="oldPassword floatingInput">
                        Old password
                    </label>
                    <input
                        autoComplete="off"
                        type="password"
                        name="oldPassword"
                        value={oldPassword}
                        onInput={(ev) => inputHandler(ev, setOldPasswordData)}
                    />
                </div>

                <div className="input-group">
                    <label className="form-text" htmlFor="newPassword">
                        New password
                    </label>
                    <input
                        autoComplete="off"
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onInput={(ev) => inputHandler(ev, setNewPasswordData)}
                    />
                </div>

                <div className="input-group">
                    <label className="form-text" htmlFor="confirmPassword">
                        Confirm new password
                    </label>
                    <input
                        autoComplete="off"
                        type="password"
                        name="confirmPassword"
                        value={confirmData}
                        onInput={(ev) => inputHandler(ev, setConfirmData)}
                    />
                </div>

                <input type="submit" className="btn btn-secondary" value="Let's do it" />
            </form>
        </div>
    );
};
