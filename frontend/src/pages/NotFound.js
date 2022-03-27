import { Link } from 'react-router-dom';

export const NotFound = () => (
    <div>
        <h1>404</h1>
        <p>page not found</p>
        <p>
            Go back to the <Link to="/">homepage</Link>
        </p>
    </div>
);
