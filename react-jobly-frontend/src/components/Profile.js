import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Profile.css"
import {
    Form,
    Label,
    Input,
    Button
} from 'reactstrap'



const Profile = ({ user , update}) => {
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
    
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
        console.log(formData);
        update({...formData})
        navigate("/")
    }
    return (
        <div className="Profile">
            <h1>Edit Profile</h1>
            <Form onSubmit={ handleSubmit }>
                <Label htmlFor="username">Username:</Label>
                <Input id="username" name="username" placeholder="New Username" onChange={handleChange} value={formData.username} disabled={true}/>

                <Label htmlFor="firstName">First Name:</Label>
                <Input id="firstName" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName}/>

                <Label htmlFor="lastName">Last Name:</Label>
                <Input id="lastName" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName}/>

                <Label htmlFor="email">Email:</Label>
                <Input id="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email}/>
                
                <Button color="success">Save Changes</Button>
            </Form>
        </div>
    )
};

export default Profile;