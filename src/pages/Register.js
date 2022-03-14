import {Link} from "react-router-dom";

export const Register = () => {
    return (
        <div className="form-wrapper">
        <form action="">
            <legend className="fw-bold fs-4">Sign up</legend>
            <div className="input-group">
                <label className="form-text" htmlFor="email floatingInput">Email</label>
                <input autoComplete="off" type="text" name='email'/>
            </div>

            <div className="input-group">
                <label className="form-text" htmlFor="password">Password</label>
                <input autoComplete="off" type="password" name="password"/>
            </div>

            <div className="input-group">
                <label className="form-text" htmlFor="confirmPassword">Confirm password</label>
                <input autoComplete="off" type="password" name="confirmPassword"/>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="adult"/>
                <label className="form-text checkbox-label " htmlFor="adult">I'm sober and ready to sell my soul to
                    the devil</label>
            </div>

            <input type="submit" className="btn btn-secondary" value="Submit"/>
            <p className="form-text">Already have an account? <Link to="/login">Sign in</Link></p>

        </form>
    </div>
    )
}
