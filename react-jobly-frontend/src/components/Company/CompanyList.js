import React, { useState, useEffect } from "react";
import CompanySearchForm from "../Forms/CompanySearchForm";
import JoblyApi from "../../helpers/api";
import CompanyCard from './CompanyCard';
import '../../styles/CompanyList.css'
import { Link } from "react-router-dom";

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const getAllCompanies = async () => {
            const res = await JoblyApi.getAllCompanies();
            setCompanies(res);
        } 
        getAllCompanies();
    }, [])

    const searchCompany = async ({ search }) => {
        const res = await JoblyApi.searchCompany(search);
        console.log(res.companies);
        setCompanies(res.companies);
    };  

    return (
        <div className="CompanyList">
            <CompanySearchForm companySearch={ searchCompany }/>

            <div className="list-cards">
                {companies.map(company => (
                    <Link to={`/companies/${company.handle}`}>
                        <CompanyCard key={company.handle} description={company.description} name={company.name} handle={company.handle}/>
                    </Link>
                ))}
            </div>

        </div>
    )
};

export default CompanyList;
