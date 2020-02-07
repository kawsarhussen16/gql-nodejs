import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries/index";
import Error from "./Error.js";
import { withRouter } from "react-router-dom";
const initialState = {
    username: "",
    password: ""
};
class Signin extends Component {
    state = { ...initialState };
    clearState = () => {
        this.setState({ ...initialState });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = (e, signinUser) => {
        e.preventDefault();
        signinUser().then(async (data) => {
            localStorage.setItem("token", data.data.signinUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push("/");
        });
    };
    validateForm = () => {
        const { username, password } = this.state;
        const isInvalid = !username || !password;
        return isInvalid;
    };

    render() {
        const { username, password } = this.state;
        return (
            <div className="App">
                <h2 className="App"> Sign In </h2>{" "}
                <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
                    {(signinUser, { data, loading, error }) => {
                        return (
                            <form
                                className="form"
                                onSubmit={(e) => this.handleSubmit(e, signinUser)}>
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    name="password"
                                    placeholder="Password"
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

export default withRouter(Signin);
