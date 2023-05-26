import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginForm.css"
import {
    Button,
    Form,
    Input,
    Label
}
from 'reactstrap'

const LoginForm = ({login}) => {
    const INITIAL_STATE = {
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login({...formData});
        navigate("/");
    };


    return (
        <div className="LoginForm">
            <Form onSubmit={handleSubmit}>
                <h1 className="login-header">Login</h1>

                <Label htmlFor="username">Username:</Label>
                <Input id="username" name="username" placeholder="Username..." onChange={handleChange} value={formData.username}/>
            
            
                <Label htmlFor="password">Password:</Label>
                <Input type="password" id="password" name="password" placeholder="Password..." onChange={handleChange} value={formData.password}/>

                <Button type="submit" color="success">Login</Button>

            </Form>
        </div>
    )
};

export default LoginForm;