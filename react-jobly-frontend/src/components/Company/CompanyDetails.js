import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JoblyApi from "../../helpers/api";


const CompanyDetails = () => {
    const routeParams = useParams();
    const [company, setCompany] = useState(null);
    
    useEffect(() => {
        const getCompany = async () => {
            const res = await JoblyApi.getCompany(routeParams.handle)
            setCompany(res)
        }
        getCompany()
    }, [])


    return (
        <div className="CompanyDetails">
            <h1>{company.name}</h1>
            <p>{company.description}</p>
        </div>
    )
};

export default CompanyDetails;