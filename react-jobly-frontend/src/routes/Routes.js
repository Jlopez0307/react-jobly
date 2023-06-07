//React & React Router
import React, { useContext, useState, useEffect } from "react";
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
// import UserContext from "../context/UserContext";

import JoblyApi from '../helpers/api';
import jwt_decode from 'jwt-decode';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router';

const AppRoutes = () => {

    //User token
    const [token, setToken] = useState(() => {
		//Checks local storage for user token, if no token returns null
		const saved = localStorage.getItem("token");
		JoblyApi.token = saved;
		return saved || null;
	});
    //Sets current user to state
	const [currUser, setCurrUser] = useState(null);

    //For refreshing page or nagivation
	const navigate = useNavigate();
	
	useEffect(() => {
		const decode = async () => {
			try{
				//Sets user token in local storage
				localStorage.setItem("token", token);

				//Decodes user token and sets it to currUser
				const decodeUser = jwt_decode(token);
				const findUser = await JoblyApi.getUser(decodeUser.username);
				setCurrUser(findUser.user);
			}catch(err){
				console.log(err);
			}
		}
		decode();
	}, [token])

	//Updates a users profile
	const update = async ({username, firstName, lastName, email}) => {
		try{
			//Attempts request to backend
			const req = await JoblyApi.request(`users/${username}`, {firstName: firstName, lastName: lastName, email: email}, "patch");
			//Sets new info to current user
			setCurrUser(req.user)
		} catch (e){
			console.log(e);
		};
	};

	//Login for user
	const login = async ({username, password}) => {
		try{
			const res = await JoblyApi.login(username, password);
			setToken(res.token);
			//Refreshes page to show updated navbar and home page
			navigate(0)
		} catch (e){
			console.log(e);
		}
	}

	const logout = () => {
		setCurrUser(null);
		setToken(null);
	}

	const signup = async ({username, password, firstName, lastName, email}) => {
		try{
			const res = await JoblyApi.request("auth/register", {
				username: username, 
				password: password, 
				firstName: firstName, 
				lastName: lastName, 
				email: email
			}, "post")
			setToken(res.token);
			navigate(0);
		} catch (e){
			console.log(e);
		}

	}

    return (
        <>
            <UserContext.Provider value={currUser}>

                <NavBar logout={logout} user={currUser}/>
                <Routes>
                    <Route exact path="/" element={<Home user={currUser}/>}/>

                    {/* forms for logging in and sign up */}
                    <Route exact path="/login" element={<LoginForm login={login} />}/>
                    <Route exact path="/signup" element={<SignUpForm signup={signup}/>} />

                    <Route exact path="/profile" element={currUser ? <Profile user={currUser} update={update}/> : <Home user={currUser}/>} />

                    {/* Company Routes */}
                    <Route exact path="/companies" element={currUser ? <CompanyList/> : <Home user={currUser}/>} />
                    <Route exact path="/companies/:handle" element={currUser ? <CompanyDetails/> : <Home user={currUser}/>} />

                    {/* Job routes */}
                    <Route exact path="/jobs" element = {currUser ? <JobList/> : <Home user={currUser}/>}/>

                    {/* Redirect path if URL not found */}
                    <Route exact path="*" element={<Home user={currUser}/> && <Navigate to="/" replace/>}/>
                
                </Routes>
            </UserContext.Provider>
        </>
    )
};

export default AppRoutes;