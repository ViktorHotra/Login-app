import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <div className="form-wrapper">
            <form action="">
                <legend className="fw-bold fs-4">Sign in</legend>
                <div className="input-group">
                    <label className="form-text" htmlFor="email floatingInput">Email</label>
                    <input autoComplete="off" type="text" name='email'/>
                </div>

                <div className="input-group">
                    <label className="form-text" htmlFor="password">Password</label>
                    <input autoComplete="off" type="password" name="password"/>
                </div>

                <input type="submit" className="btn btn-secondary" value="Submit"/>
                <p className="form-text">Don't have an account? <Link to="/register">Register now</Link></p>
            </form>
        </div>
    )
}
