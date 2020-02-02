import React from "react";
import "./App.css";
import { GET_ALL_RECIPES } from "../queries/index";
import { Query } from "react-apollo";

const App = () => (
    <div className="App">
        <h1> Home</h1>
        <Query query={GET_ALL_RECIPES}>
            {({ data, loading, error }) => {
                if (loading) return <div> loading...</div>;
                if (error) return <div> Error...</div>;
                console.log(data);
                return <p> Recipes</p>;
            }}
        </Query>
    </div>
);

export default App;
