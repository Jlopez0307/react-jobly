import React from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="Nav">
            <ul>
                <Link to="/">Jobly</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/companies">Companies</Link>
                <Link to="/jobs">Jobs</Link>
            </ul>
        </div>
    )
};

export default Nav;
