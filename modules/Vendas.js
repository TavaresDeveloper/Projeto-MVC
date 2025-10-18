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
        allowNull: false,
        references: {
            model: 'Produtos',
            key: 'produtoID'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },

    precoUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    precoTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vendedor: {
        type: DataTypes.STRING,
        allowNull: true
    
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    dataVenda: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, 
{
    tableName: 'Vendas',
    timestamps: false,
    freezeTableName: true
});

module.exports = Vendas;