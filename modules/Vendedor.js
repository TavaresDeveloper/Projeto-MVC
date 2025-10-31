const sequelize = require('./config/database.js');
const { DataTypes } = require('sequelize');



const Vendedor = sequelize.define('Vendedor', {
    VendedorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,   
        autoIncrement: true
    },
    VendedorNome: { 
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'Vendedor',
    timestamps: false
});

module.exports = Vendedor;
