const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path : 'variable.env'})
const bodyParser = require('body-parser');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');

const Recipe = require("./models/recipe.js");
const User = require("./models/user.js");
const {typeDefs} = require("./schema");
const {resolvers}  = require('./resolvers'); 

const corsOptions = {
    origin : "http://localhost:3000",
    credentials: true
};
app.use(cors(corsOptions))

//Create Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//connect schemas with graphql
const server = new ApolloServer({
        schema,
        context: {
            Recipe, User
        }
})
const path = '/graphql';

app.use(bodyParser.json())
server.applyMiddleware({
    app, path, // app is from an existing express app
  });
  
mongoose
    .connect(process.env.MONGO_URI)
    .then( ()=> console.log('Db connected'))
    .catch( err => console.log(err))



const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`Server is listening on Port ${PORT}`);
})