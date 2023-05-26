import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SignupForm.css"
import {
    Button,
    Form,
    Input,
    Label
}
from 'reactstrap'

const SignUpForm = ({ signup }) => {
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };

    const navigate = useNavigate();

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signup({...formData});
        setFormData(INITIAL_STATE)
        navigate("/")
    }


    return (
        <div className="SignUp">
            <Form onSubmit={ handleSubmit }>
                <h1 className="signup-header">Sign Up!</h1>

                
                <Label htmlFor="username">Username:</Label>
                <Input id="username" name="username" placeholder="New Username" onChange={handleChange} value={formData.username}/>
               

                <Label htmlFor="password">Password:</Label>
                <Input type="password" id="password" name="password" placeholder="New Password" onChange={handleChange} value={formData.password}/>
               

                <Label htmlFor="firstName">First Name:</Label>
                <Input id="firstName" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName}/>
                

                <Label htmlFor="lastName">Last Name:</Label>
                <Input id="lastName" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName}/>
               

                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email}/>
                
                <Button color="success">Sign Up!</Button>
            </Form>
        </div>
    )
};

export default SignUpForm;