import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Routes from './routes/Routes';
import JoblyApi from './helpers/api';
import jwt_decode from 'jwt-decode';
import UserContext from './context/UserContext';
import { useNavigate } from 'react-router';

function App() {
	const [token, setToken] = useState(() => {
		//Checks local storage for user token, if no token returns null
		const saved = localStorage.getItem("token");
		JoblyApi.token = saved;
		return saved || null;
	});
	const [currUser, setCurrUser] = useState(null);
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

	const update = async ({username, firstName, lastName, email}) => {
		const req = await JoblyApi.request(`users/${username}`, {firstName: firstName, lastName: lastName, email: email}, "patch");
		setCurrUser(req.user)
	}

	const login = async ({username, password}) => {
		const res = await JoblyApi.login(username, password);
		setToken(res.token);
		navigate(0)
	}

	const logout = () => {
		setCurrUser(null);
		setToken(null);
	}

	const signup = async ({username, password, firstName, lastName, email}) => {
		const res = await JoblyApi.request("auth/register", {
			username: username, 
			password: password, 
			firstName: firstName, 
			lastName: lastName, 
			email: email
		}, "post")
		setToken(res.token);
		navigate(0);

	}

	return (
		<div className="App">
			<UserContext.Provider value={currUser}>
				<Routes login={login} logout={logout} signup={signup} update={update}/>
			</UserContext.Provider>
    	</div>
  	);
}

export default App;
