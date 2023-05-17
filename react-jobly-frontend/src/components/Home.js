import React from "react";
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="Home">
            <h1>Jobly</h1>
            <button><Link to="/signup">Signup!</Link></button>
        </div>
    )
};

export default Home;