import React, {useState} from "react";
import "../styles/Profile.css"
import {
    Form,
    Label,
    Input,
    Button
} from 'reactstrap'



const Profile = ({ user , update}) => {
    const INITIAL_STATE = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
    
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [status, setStatus] = useState(null);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if( !formData.firstName || !formData.lastName || !formData.email ){
            setStatus('Please fill out all forms');
        }else {
            setStatus('Success!')
        }
        update({...formData})
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

                {status === 'Success!' ? <p className="status success">{status}</p> : <p className="status error">{status}</p>}

                <Button color="success">Save Changes</Button>
            </Form>
        </div>
    )
};

export default Profile;
