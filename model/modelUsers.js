const Sequelize = require('sequelize');
const connectionDatabase = require('./connection');

const Users = connectionDatabase.define('users', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    code:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    fullname:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    cpf:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    apartment:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    fone:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    birthday:{
        type:Sequelize.DATEONLY,
        allowNull: false,
    },
    /* brand:{
        type:Sequelize.STRING,
        allowNull: false,
    }, */
    model:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    board:{
        type:Sequelize.STRING,
        allowNull: false,
    },
   /*  year:{
        type:Sequelize.STRING,
        allowNull: false,
    } */
});

(async () => {
    await Users.sync({ force: false });
})();

module.exports = Users;