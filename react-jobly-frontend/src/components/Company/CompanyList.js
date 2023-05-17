import React, { useState, useEffect } from "react";
import SearchForm from "../Forms/SearchForm";
import JoblyApi from "../../helpers/api";
import CompanyCard from './CompanyCard';
import '../../styles/CompanyList.css'
import { Link } from "react-router-dom";

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        const getAllCompanies = async () => {
            const res = await JoblyApi.getAllCompanies();
            setCompanies(res);
        } 
        getAllCompanies();
    }, [])

    const addToSearch = () => {
        //Make sure to add API call in serach form component and get that data back up here
        console.log(search);
    };  

    return (
        <div className="CompanyList">
            <SearchForm add={ addToSearch }/>

            <h1>This is the company list</h1>
            {companies.map(company => (
                <Link to={`/companies/${company.handle}`}><CompanyCard key={company.handle} description={company.description} name={company.name} /></Link>
            ))}
        </div>
    )
};

export default CompanyList;
