const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const registerationRoutes = require('./routes/registration');

const app = express();
require('dotenv').config({ path: './.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({ origin: '*' })); 

app.use('/users',userRoutes);
app.use('/registered-users',registerationRoutes);

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('here')
    app.listen(3001,()=>{
        console.log('server is listening');
    })
})
.catch(err=>{
    console.log(err);
})
