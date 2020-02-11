import React from "react";
import { ApolloConsumer } from "react-apollo";
import { SEARCH_RECIPES } from "../../queries/index";
import { Link } from "react-router-dom";
import "./Search.style.scss";

class Search extends React.Component {
    state = {
        searchResults: []
    };
    handleChange = ({ searchRecipes }) => {
        this.setState({
            searchResults: searchRecipes
        });
    };
    render() {
        const { searchResults } = this.state;
        return (
            <ApolloConsumer>
                {(client) => (
                    <div className="App">
                        <input
                            type="search"
                            placeholder="Search for Recipes"
                            onChange={async (e) => {
                                e.persist();
                                const { data } = await client.query({
                                    query: SEARCH_RECIPES,
                                    variables: { searchTerm: e.target.value }
                                });
                                this.handleChange(data);
                            }}
                        />
                        <div className="search-page">
                            {searchResults.map((recipe) => (
                                <div className="each-result" key={recipe._id}>
                                    <Link to={`recipes/${recipe._id}`}>
                                        {" "}
                                        <h4>{recipe.name} </h4>
                                    </Link>
                                    <p>Likes: {recipe.likes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}

export default Search;
