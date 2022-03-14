import {Link} from "react-router-dom";

export const Home = () => {
    return <div>
            <h1>Home page</h1>
        <div className="logout"><Link to="/login" >Logout</Link></div>

        </div>

}
