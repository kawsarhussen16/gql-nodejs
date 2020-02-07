import { gql } from "apollo-boost";

// RECIPES QUERIES
export const GET_ALL_RECIPES = gql`
    query {
        getAllRecipes {
            _id
            name
            category
        }
    }
`;
//GET A RECIPE BY ID
export const GET_RECIPE = gql`
    query($_id: ID!) {
        getRecipe(_id: $_id) {
            _id
            name
            category
            description
            instructions
            createdDate
            likes
            username
        }
    }
`;

// RECIPES MUTATIONS
export const ADD_RECIPE = gql`
    mutation(
        $name: String!
        $description: String!
        $category: String!
        $instructions: String!
        $username: String
    ) {
        addRecipe(
            name: $name
            description: $description
            instructions: $instructions
            category: $category
            username: $username
        ) {
            _id
            name
            category
            description
            instructions
            createdDate
            likes
        }
    }
`;

// USER QUERIES
export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            username
            joinDate
            email
        }
    }
`;

// USER MUTATIONS

export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signinUser(username: $username, password: $password) {
            token
        }
    }
`;

export const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signupUser(username: $username, email: $email, password: $password) {
            token
        }
    }
`;
