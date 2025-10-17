
const { or } = require('sequelize');
const {Venda, Produto, Cliente} = require('../models');
const Categoria = require('../modules/Categoria');


module.exports = {
    listarVendas: async (req, res) => {
        try {
            const vendas = await Venda.findAll({
                include:[{
                      model: Produto ,
                      as: 'produto',

                     model: Cliente ,
                     
                 include:[{ 
                    
                    model: Categoria,
                    as: 'categoria'

                     }]
        
            }], 
              order: [['VendaData', 'DESC']]
           });
           const totalVendas = vendas.length;
           const valorTotalVendas = vendas.reduce((total, venda) => {
               return total + (venda.VendaQuantidade * venda.Produto.preco);
           }, 0);
           const produtosVendidos = vendas.reduce((total, venda) => {
               return total + venda.VendaQuantidade;
           }, 0);
            res.status(200).render("venda", {
                vendas: vendas
            });
            res.json({
                totalVendas,
                estatisticas: {
                valorTotalVendas,
                produtosVendidos
                }
            });
        } catch (error) {
            console.error("Erro ao listar vendas:", error);
            res.status(500).send("Erro ao listar vendas");
        }   
    },

    criarVenda: async (req, res) => {
        try {
            let { VendaData, VendaQuantidade, ProdutoId, ClienteId } = req.body;
            await Venda.create({
                VendaData,
                VendaQuantidade,
                ProdutoId,
                ClienteId
            });
            res.redirect("/Venda");
        } catch (error) {
            console.error("Erro ao criar venda:", error);
            res.status(500).send("Erro ao criar venda");
        }
    }

};