import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const handleSignout = (client, history) => {
    localStorage.setItem("token", "");
    client.resetStore();
    history.push("/");
};
const Signout = ({ history }) => (
    <ApolloConsumer>
        {(client) => {
            return (
                <div
                    className="nav-button"
                    onClick={() => handleSignout(client, history)}>
                    {" "}
                    Signout
                </div>
            );
        }}
    </ApolloConsumer>
);

export default withRouter(Signout);
