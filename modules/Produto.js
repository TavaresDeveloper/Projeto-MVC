const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {

    ProdutoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
    ProdutoNome: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    ProdutoQTD: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ProdutoPreco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    ProdutoImagem: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Produto;



