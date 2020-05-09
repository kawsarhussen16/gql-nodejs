import React from "react";
import { Query } from "react-apollo";
import { GET_USER_RECIPES } from "../../queries";
import { Link } from "react-router-dom";
const UserRecipes = ({ username }) => {
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div> Error</div>;
        return (
          <>
            <h3>Your Recipes</h3>
            {data.getUserRecipes.map((recipe) => (
              <div key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  <p>{recipe.name}</p>{" "}
                </Link>
                <p>{recipe.likes}</p>
              </div>
            ))}
          </>
        );
      }}
    </Query>
  );
};

export default UserRecipes;
