import React from "react";
import { Mutation } from "react-apollo";
import { ADD_RECIPE, GET_ALL_RECIPES } from "../../queries";
import Error from "../Auth/Error";
import { withRouter } from "react-router-dom";
const initialState = {
    name: "",
    instructions: "",
    category: "Dinner",
    description: "",
    username: ""
};

class AddRecipe extends React.Component {
    state = { ...initialState };
    clearState = () => {
        this.setState({ ...initialState });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({ data }) => {
            console.log(data);
            this.clearState();
            this.props.history.push("/");
        });
    };
    updateCache = (cache, { data: { addRecipe } }) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        });
    };
    componentDidMount() {
        if (this.props.session.getCurrentUser.username !== null) {
            this.setState({
                username: this.props.session.getCurrentUser.username
            });
        }
    }
    validateForm = () => {
        const { name, category, description, instructions } = this.state;
        const isInvalid = !name || !category || !instructions || !description;
        return isInvalid;
    };
    render() {
        const { name, category, description, instructions, username } = this.state;
        return (
            <Mutation
                mutation={ADD_RECIPE}
                variables={{ name, category, description, instructions, username }}
                update={this.updateCache}>
                {(addRecipe, { data, loading, error }) => {
                    return (
                        <div className="add-recipe-container">
                            <h2> Add Recipe</h2>
                            <form
                                className="add-recipe-form"
                                onSubmit={(event) => this.handleSubmit(event, addRecipe)}>
                                <input
                                    value={name}
                                    type="text"
                                    name="name"
                                    placeholder="Recipe Name"
                                    onChange={this.handleChange}
                                />
                                <select
                                    value={category}
                                    name="category"
                                    onChange={this.handleChange}>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch </option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
                                <input
                                    value={description}
                                    type="text"
                                    name="description"
                                    placeholder="Add description"
                                    onChange={this.handleChange}
                                />
                                <textarea
                                    value={instructions}
                                    name="instructions"
                                    placeholder="Add instructions"
                                    onChange={this.handleChange}
                                />
                                <button
                                    type="submit"
                                    className="button-primary add"
                                    disabled={loading || this.validateForm()}>
                                    {" "}
                                    Submit
                                </button>
                                {error && <Error error={error} />}
                            </form>
                        </div>
                    );
                }}
            </Mutation>
        );
    }
}

export default withRouter(AddRecipe);
