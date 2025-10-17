const sequelize = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Vendas = sequelize.define('Vendas', {
    vendaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produtoID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataVenda: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Vendas',
    timestamps: false
});