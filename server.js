const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variable.env" });
const bodyParser = require("body-parser");
const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");

const Recipe = require("./models/recipe.js");
const User = require("./models/user.js");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};
app.use(cors(corsOptions));
//Set up JWT authentication middleware

app.use(async (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(token);
    if (token !== "null") {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            console.log(currentUser);
        } catch (err) {
            console.log(err);
        }
    }
    next();
});

//Create Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//connect schemas with graphql
const server = new ApolloServer({
    schema,
    context: {
        Recipe,
        User
    }
});
const path = "/graphql";

app.use(bodyParser.json());
server.applyMiddleware({
    app,
    path // app is from an existing express app
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Db connected"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});
