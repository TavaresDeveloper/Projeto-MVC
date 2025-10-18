const {DataTypes} = require('sequelize');
const sequelize = require('../config/database.js');


const Cliente = sequelize.define('Cliente', {

    ClienteID: {    
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ClienteNome: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    
},
{
    tableName: 'Cliente',
    timestamps: false,
    freezeTableName: true
});


module.exports = Cliente;