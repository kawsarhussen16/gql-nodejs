import React from "react";
import { Query } from "react-apollo";
import { GET_RECIPE } from "../../queries/index";

import { withRouter } from "react-router-dom";
const RecipePage = ({ match }) => {
    const { _id } = match.params;
    return (
        <Query query={GET_RECIPE} variables={{ _id }}>
            {({ data, loading, error }) => {
                if (loading) return <div> Loading...</div>;
                if (error) return <div>Error</div>;
                console.log(data);
                const {
                    name,
                    category,
                    description,
                    instructions,
                    createdDate,
                    likes,
                    username
                } = data.getRecipe;
                return (
                    <div className="App">
                        <h2>{name} </h2>
                        <p>Category: {category} </p>
                        <p>Description: {description} </p>
                        <p>Instructions: {instructions} </p>
                        <p>Likes: {likes} </p>
                        <p>Created Date: {createdDate} </p>
                        <p>Created By: {username} </p>
                        <button> Like </button>
                    </div>
                );
            }}
        </Query>
    );
};

export default withRouter(RecipePage);
