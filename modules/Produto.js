const {DataTypes} = require('sequelize');
const sequelize = require('../config/database.js');


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
    },
    ProdutoCategoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Categoria = require('./Categoria');

 Produto.belongsTo(Categoria,{
    foreignKey: 'ProdutoCategoria',
    as: 'categorias'
 });

module.exports = Produto;



