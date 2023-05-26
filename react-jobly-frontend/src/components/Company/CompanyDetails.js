import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import JoblyApi from "../../helpers/api";
import JobCard from "../Jobs/JobCard";
import UserContext from "../../context/UserContext";

import '../../styles/CompanyDetails.css';


const CompanyDetails = () => {
    const user = useContext(UserContext)
    const routeParams = useParams();
    const [company, setCompany] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applied, setApplied] = useState()
    // console.log([...new Set(user.applications.filter(appId => jobId.includes(appId)))])
    console.log(applied)

    useEffect(() => {
        const getCompany = async () => {
            const res = await JoblyApi.getCompany(routeParams.handle)
            setCompany(res)
            setJobs(res.jobs)
        }
        getCompany()
    }, [])
   
    const applyToJob = async (id) => {
        const res = await JoblyApi.userJobApplication(user.username, id);
        return res;
    }
    
    

    return (
        <div className="CompanyDetails">
            <div className="details-header">
                <h1>{company.name}</h1>
                <p>{company.description}</p>
            </div>
            <div className="list-cards">
                {jobs.map(job => 
                    <JobCard 
                        id={job.id} 
                        title={job.title} 
                        salary={job.salary} 
                        companyName={company.name} 
                        key={job.id}
                        apply={ applyToJob }
                    />
                )}
            </div>
        </div>
    )
};

export default CompanyDetails;