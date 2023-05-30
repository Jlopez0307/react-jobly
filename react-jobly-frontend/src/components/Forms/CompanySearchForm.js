import React, { useState } from 'react';
import '../../styles/SearchForm.css'
import {
    Form,
    Label,
    Input,
    Button
} from "reactstrap";

const CompanySearchForm = ({ companySearch }) => {
    const INITIAL_STATE = {
        search: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        companySearch({...formData});
        setFormData(INITIAL_STATE)
    };

    return (
        <div className="SearchForm">
            <Form onSubmit={ handleSubmit }>

                <Label htmlFor="search"></Label>
                <Input id="search" name="search" placeholder="Search company..." onChange={handleChange} value={formData.search}/>
                
                <Button type="submit" color="primary">Search</Button>

            </Form>
        </div>
    )
};

export default CompanySearchForm;