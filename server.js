const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path : 'variable.env'})
const bodyparser = require('body=parser');
mongoose
    .connect(process.env.MONGO_URI)
    .then( ()=> console.log('Db connected'))
    .catch( err => console.log(err))

const PORT = process.env.PORT || 4000;



app.listen(PORT, ()=> {
    console.log(`Server is listening on Port ${PORT}`);
})