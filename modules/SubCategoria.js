const Produto = require('./Produto');
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');


const SubCategoria = sequelize.define('SubCategoria', {

    SubCategoriaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    SubCategoriaNome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CategoriaID: {
        type: DataTypes.INTEGER,        
        references: {
            model: Categoria,
            key: 'CategoriaID'
        }
    }
});