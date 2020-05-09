import React from "react";
import { ApolloConsumer } from "react-apollo";
import { SEARCH_RECIPES } from "../../queries/index";
import SearchItem from "./SearchItem";

import "./Search.style.scss";

class Search extends React.Component {
  state = {
    searchResults: [],
  };
  handleChange = ({ searchRecipes }) => {
    this.setState({
      searchResults: searchRecipes,
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
                  variables: { searchTerm: e.target.value },
                });
                this.handleChange(data);
              }}
            />
            <div className="search-page">
              {searchResults.map((recipe) => (
                <SearchItem key={recipe._id} {...recipe} />
              ))}
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
