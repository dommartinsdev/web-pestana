const express = require('express');
const bodyParser = require('body-parser');
const useRouter = require('./routes/routes');
const Sequelize = require('sequelize');
const port = process.env.PORT || 5000;
const connectionDatabase = require('./model/connection');
connectionDatabase.authenticate();
const Users = require('./model/modelUsers');
const session = require('express-session');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(session({ secret:"pestana", resave:true, saveUninitialized:true }));

app.use('/',useRouter);
app.use('/login',useRouter);
app.use('/register',useRouter);
app.use('/dashboard',useRouter);
app.use('/customers',useRouter);
app.use('/records',useRouter);

app.listen(port);