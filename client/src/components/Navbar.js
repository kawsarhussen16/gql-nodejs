import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Signout from "./Auth/Signout";

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
            <NavLink className="nav-button" to="/" exact>
                Home
            </NavLink>

            <NavLink className="nav-button" to="/search">
                Search
            </NavLink>

            <NavLink className="nav-button" to="/recipe/add">
                Add Recipe
            </NavLink>

            <NavLink className="nav-button" to="/profile" exact>
                Profile
            </NavLink>

            <Signout />
        </ul>
        <h4>
            {" "}
            Welcome, <strong>{session.getCurrentUser.username}</strong>
        </h4>
    </Fragment>
);

const NavbarUnAuth = () => (
    <ul>
        <NavLink className="nav-button" to="/" exact>
            Home
        </NavLink>

        <NavLink className="nav-button" to="/search" exact>
            Search
        </NavLink>

        <NavLink className="nav-button" to="/signin" exact>
            Signin
        </NavLink>

        <NavLink className="nav-button" to="/signup" exact>
            Signup
        </NavLink>
    </ul>
);

export default NavBar;
