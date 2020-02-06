import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ session }) => (
    <nav>
        {session && session.getCurrentUser ? (
            <NavbarAuth session={session} />
        ) : (
            <NavbarUnAuth />
        )}
    </nav>
);
const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li>
                <NavLink to="/" exact>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
            <li>
                <NavLink to="/recipe/add">Add Recipe</NavLink>
            </li>
            <li>
                <NavLink to="/profile" exact>
                    Profile
                </NavLink>
            </li>
            <button>Signout</button>
        </ul>
        <h4>
            {" "}
            Welcome, <strong>{session.getCurrentUser.username}</strong>
        </h4>
    </Fragment>
);

const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/search" exact>
                Search
            </NavLink>
        </li>
        <li>
            <NavLink to="/signin" exact>
                Signin
            </NavLink>
        </li>
        <li>
            <NavLink to="/signup" exact>
                Signup
            </NavLink>
        </li>
    </ul>
);

export default NavBar;
