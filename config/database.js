const sequelize = require('sequelize');
const { Sequelize } = sequelize;

module.exports = new Sequelize('loja', 'root', '78900',{
    host: 'localhost',
    dialect: 'mysql'

});

module.exports.Sequelize = Sequelize;