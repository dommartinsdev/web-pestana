const Sequelize = require('sequelize');
const connectionDatabase = require('./connection');

const Logins = connectionDatabase.define('logins', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    fullname:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    user:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false,
    },

});

(async () => {
    await Logins.sync({ force: false });
})();

module.exports = Logins;