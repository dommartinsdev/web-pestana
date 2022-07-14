const Logins = require("../model/modelLogin");
const bcrypt = require('bcryptjs');

const loginAuthentication = (req,res) => {
    let data = new Date().getFullYear();
    Logins.findOne({
        where:{
            user:req.body.user,
        }
    }).then(function(user){
        if(user != undefined){
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user = {
                    id: user.id,
                    fullname: user.fullname,
                    user: user.user,
                    password: user.password
                }
                res.redirect('/dashboard');
            }else{
                res.render('login/login',{
                    message:'Usuário é senha inválidos!',
                    title:'Pestana - Login',
                    data
                })
            }
        }else{
            res.render('login/login',{
                message:'Usuário é senha inválidos!',
                title:'Pestana - Login',
                data
            })
        }
    })
}

const loginCreateUsers = (req,res) => {
    let fullname = req.body.fullname;
    let email = req.body.email;
    let user = req.body.user;
    let password = req.body.password;

    let salt = bcrypt.genSaltSync(10);
    let passwordCripto = bcrypt.hashSync(password,salt);

    let title = 'Pestana - Início';
    let data = new Date().getFullYear();
    Logins.create({
        fullname:fullname,
        email:email,
        user:user,
        password:passwordCripto
    }).then(
        res.render('login/login',{
            title,
            data,
            message:'Usuário cadastrado.',
        })
    );
}

const loginLogout = (req,res) => {
    req.session.user = undefined;
    res.redirect('/');
}
module.exports = { loginAuthentication, loginCreateUsers, loginLogout };