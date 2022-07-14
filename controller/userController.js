const Users = require('../model/modelUsers');
const authorization = require('../authorization/authorization');

const userNew = (req, res) => {
    let userConnected = req.session.user.fullname;
    let codeRandom = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    res.render('records/records-new', {message:'',codeRandom,userConnected})
}
const userSave = (req, res) => {
    let code = req.body.code;
    let fullname = req.body.fullname;
    let cpf = req.body.cpf;
    let apartment = req.body.apartment;
    let fone = req.body.fone;
    let birthday = req.body.birthday;
    /* let brand = req.body.brand; */
    let board = req.body.board;
    /* let year = req.body.year; */
    let model = req.body.model;
    let userConnected = req.session.user.fullname;

    let title = 'Pestana - Cadastro';
    let data = new Date().getFullYear();
    let codeRandom = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    Users.create({
        code:code,
        fullname:fullname,
        cpf:cpf,
        apartment:apartment,
        fone:fone,
        birthday:birthday,
        /* brand:brand, */
        board:board,
        /* year:year, */
        model:model,
    }).then(
        res.render('records/records',{
            title,
            data,
            message:'Usuário cadastrado.',
            codeRandom,
            userConnected
        })
    )
}

const userList = (req,res) => {
    let title = 'Pestana - Clientes';
    let data = new Date().getFullYear();
    let userConnected = req.session.user.fullname;
    Users.findAll({order: ['fullname']}).then(function(users) {
            res.render('customers/customers',{
                users:users,
                title,
                data,
                message:'',
                userConnected
            });
         })
}

const userEdit = (req,res) => {
    let id = req.params.id;
    let title = 'Pestana - Clientes';
    let data = new Date().getFullYear();
    let userConnected = req.session.user.fullname;

    Users.findByPk(id).then(function(user){
        res.render('records/records-edit',{
            user:user,
            title,
            data,
            message:'',
            userConnected
        });
    })
}

const userUpdate = (req,res) => {
    let id = req.body.id;
    let code = req.body.code;
    let fullname = req.body.fullname;
    let cpf = req.body.cpf;
    let apartment = req.body.apartment;
    let fone = req.body.fone;
    let birthday = req.body.birthday;
    let userConnected = req.session.user.fullname;

    Users.update({
        fullname:fullname,
        cpf:cpf,
        apartment:apartment,
        fone:fone,
        birthday:birthday,
    }, {where: {id:id}}).then(function(){
        res.redirect('/customers',authorization,{userConnected})
    })

}

const userDelete = (req,res) => {
    let id = req.params.id;
    let userConnected = req.session.user.fullname;
    Users.destroy({where:{id:id}}).then(function(){
        res.redirect('/customers',authorization,{userConnected})
    })
}


module.exports = { 
    userSave,userList,userNew,
    userEdit,userUpdate,userDelete
}