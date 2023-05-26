import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Nav.css'
import { Nav ,NavItem, NavLink, NavbarBrand } from 'reactstrap';

const NavBar = ({ logout, user }) => {

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="Nav">
            
            {user 
            
            ? 
                <Nav fill pills>
                    <NavItem className="homeLink">
                        <NavLink href="/">Jobly</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="/companies">Companies</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="/jobs">Jobs</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="/profile">Profile</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="/" onClick={handleLogout}>Logout</NavLink>
                    </NavItem>

                </Nav>
            :

                <Nav fill pills>
                
                    <NavItem>
                        <NavLink href="/">Jobly</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="/signup">Sign Up</NavLink>
                    </NavItem>

                </Nav>
            }
        </div>
    )
};

export default NavBar;
