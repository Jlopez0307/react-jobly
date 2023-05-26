//React & React Router
import React, { useContext } from "react";
import {Route, Routes, Navigate} from 'react-router-dom';

//Components
import Home from '../components/Home'
import NavBar from '../components/Nav'
import LoginForm from '../components/Forms/LoginForm'
import SignUpForm from '../components/Forms/SignUpForm'
import Profile from '../components/Profile'
import CompanyList from '../components/Company/CompanyList'
import CompanyDetails from '../components/Company/CompanyDetails'
import JobList from '../components/Jobs/JobList';

//Context for user
import UserContext from "../context/UserContext";

const AppRoutes = ({login, logout, signup, update}) => {
    const user = useContext(UserContext);

    return (
        <>
            <NavBar logout={logout} user={user}/>
            <Routes>
                <Route exact path="/" element={<Home user={user}/>}/>

                {/* forms for logging in and sign up */}
                <Route exact path="/login" element={<LoginForm login={login} />}/>
                <Route exact path="/signup" element={<SignUpForm signup={signup}/>} />

                <Route exact path="/profile" element={user ? <Profile user={user} update={update}/> : <Home user={user}/>} />

                {/* Company Routes */}
                <Route exact path="/companies" element={user ? <CompanyList/> : <Home user={user}/>} />
                <Route exact path="/companies/:handle" element={user ? <CompanyDetails/> : <Home user={user}/>} />

                {/* Job routes */}
                <Route exact path="/jobs" element = {user ? <JobList/> : <Home user={user}/>}/>

                {/* Redirect path if URL not found */}
                <Route exact path="*" element={<Home user={user}/> && <Navigate to="/" replace/>}/>
                
            </Routes>
        </>
    )
};

export default AppRoutes;