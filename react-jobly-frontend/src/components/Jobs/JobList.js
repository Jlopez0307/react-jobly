import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../../helpers/api";
import JobSearchForm from "../Forms/JobSearchForm";
import { Link } from 'react-router-dom';
import JobCard from './JobCard';
import '../../styles/JobList.css'
import UserContext from "../../context/UserContext";


const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const user = useContext(UserContext);

    useEffect(() => {
        const getAllJobs = async () => {
            const res = await JoblyApi.getAllJobs();
            setJobs(res);
        }
        getAllJobs();
    }, []);

    const applyToJob = async (id) => {
        const res = await JoblyApi.userJobApplication(user.username, id);
        return res;
    }

    const jobSearch = async ({search}) => {
        const res = await JoblyApi.searchJob(search);
        console.log(res.jobs)
        setJobs(res.jobs)
    }
    return (
        <div className="JobList">
            <JobSearchForm jobSearch={ jobSearch }/>

            <div className="list-cards">
                {jobs.map(job => (
                    <JobCard 
                        id={job.id} 
                        key={job.id} 
                        title={job.title} 
                        salary={job.salary} 
                        companyName={job.companyName} 
                        companyHandle={job.companyHandle}
                        apply={applyToJob}
                    />
                ))}
            </div>
        </div>
    );
};

export default JobList;