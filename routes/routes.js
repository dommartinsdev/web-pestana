const express = require('express');
const routes = express.Router();
const userController = require('../controller/userController');
const loginController = require('../controller/loginController');
const authorization = require('../authorization/authorization');

routes.post('/records/save',authorization,userController.userSave);
routes.get('/records/new',authorization,userController.userNew);
routes.get('/customers/edit/:id',authorization,userController.userEdit);
routes.get('/customers/delete/:id',authorization,userController.userDelete);
routes.post('/customers/save',authorization,userController.userSave);
routes.post('/customers/update',authorization,userController.userUpdate);
routes.get('/customers',authorization,userController.userList);

routes.post('/login',loginController.loginAuthentication);
routes.post('/register/save',loginController.loginCreateUsers);
routes.get('/logout',loginController.loginLogout);

routes.get('/', (req,res) => {
    let title = 'Pestana - Início';
    let data = new Date().getFullYear();
    res.render('home/home', {title, data});
});
routes.get('/login', (req,res) => {
    let title = 'Pestana - Login';
    let data = new Date().getFullYear();
    res.render('login/login', {title, data, message:''});
});
routes.get('/register', (req,res) => {
    let title = 'Pestana - Cadastro';
    let data = new Date().getFullYear();
    res.render('register/register', {title, data});
});

routes.get('/dashboard',authorization, (req,res) => {
    let title = 'Pestana - Dashboard';
    let data = new Date().getFullYear();
    let userConnected = req.session.user.fullname;
    res.render('dashboard/dashboard', {title, data,userConnected});
});
routes.get('/records',authorization, (req,res) => {
    let title = 'Pestana - Cadastro';
    let data = new Date().getFullYear();
    let userConnected = req.session.user.fullname;
    let codeRandom = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    res.render('records/records', {title, data, message:'',codeRandom,userConnected});
});
routes.get('/customers',authorization, (req,res) => {
    let title = 'Pestana - Clientes';
    let data = new Date().getFullYear();
    let userConnected = req.session.user.fullname;
    res.render('customers/customers', {title, data,userConnected});
});

module.exports = routes;