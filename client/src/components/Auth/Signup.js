import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries/index";
import Error from "./Error.js";
const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
};
export default class Signup extends Component {
    state = { ...initialState };
    clearState = () => {
        this.setState({ ...initialState });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = (e, signupUser) => {
        e.preventDefault();
        signupUser().then((data) => {
            console.log(data);
            localStorage.setItem("token", data.data.signupUser.token);
            this.clearState();
        });
    };
    validateForm = () => {
        const { username, email, password, confirmPassword } = this.state;
        const isInvalid =
            !username || !email || !password || password !== confirmPassword;
        return isInvalid;
    };

    render() {
        const { username, email, password, confirmPassword } = this.state;
        return (
            <div className="App">
                <h2 className="App"> Sign Up </h2>{" "}
                <Mutation
                    mutation={SIGNUP_USER}
                    variables={{ username, email, password }}>
                    {(signupUser, { data, loading, error }) => {
                        return (
                            <form
                                className="form"
                                onSubmit={(e) => this.handleSubmit(e, signupUser)}>
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="Email Address"
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={this.handleChange}
                                />
                                <button
                                    type="submit"
                                    className="button-primary"
                                    disabled={loading || this.validateForm()}>
                                    Submit
                                </button>
                                {error && <Error error={error} />}
                            </form>
                        );
                    }}
                </Mutation>
            </div>
        );
    }
}
