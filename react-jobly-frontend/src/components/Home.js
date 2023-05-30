import React from "react";
import {Button} from 'reactstrap';
import "../styles/Home.css"

const Home = ({ user }) => {
    return (
        <div className="Home">
            <h1>Jobly</h1>
            <p>A job search app!</p>
            
            {user ? <h2>Welcome Back {user.firstName}! </h2> : 
                <div className="home-btns">
                    <Button href="/signup"color="primary" className="signup-btn">Sign Up</Button>
                    <Button href="/login"color="primary" className="login-btn">Login</Button>
                </div>
            }
        </div>
    )
};

export default Home;