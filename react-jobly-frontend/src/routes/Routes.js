import React from "react";
import {Route, Routes} from 'react-router-dom';
import Home from '../components/Home'
import Nav from '../components/Nav'
import LoginForm from '../components/Forms/LoginForm'
import SignUpForm from '../components/Forms/SignUpForm'
import Profile from '../components/Profile'
import CompanyList from '../components/Company/CompanyList'
import CompanyDetails from '../components/Company/CompanyDetails'
import JobList from '../components/Jobs/JobList';
import JobDetails from '../components/Jobs/JobDetails'

const AppRoutes = () => {
    return (
        <>
            <Nav />
            <Routes>
            
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/signup" element={<SignUpForm/>} />
                <Route exact path="/profile" element={<Profile/>} />

                {/* Company Routes */}
                <Route exact path="/companies" element={<CompanyList/>} />
                <Route exact path="/companies/:handle" element={<CompanyDetails/>} />

                {/* Job routes */}
                <Route exact path="/jobs" element = {<JobList/>}/>
                <Route exact path="/jobs/:id" element = {<JobDetails/>} />

                
            </Routes>
        </>
    )
};

export default AppRoutes;