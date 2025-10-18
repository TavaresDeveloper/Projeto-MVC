
const sequelize = require('sequelize');
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
            let { VendaData, VendaQuantidade, ProdutoId, Cliente } = req.body;
            const produto = await Produto.findByPk(ProdutoId);

            if(!produto){
                return res.status(404).json({error: "Produto não encontrado"});
            }
            const quantidadeInt = parseInt(VendaQuantidade);
            const precoUnitario = produto.preco;
            const valorTotal = quantidadeInt * precoUnitario;

            await Venda.create({
                VendaData: new Date(VendaData),
                VendaQuantidade: quantidadeInt,
                ProdutoId : ProdutoId,
                Cliente: Cliente || null,
                observacoes: observacoes || null,
                valorTotal: valorTotal
            });
            
            res.json({
                sucesso: true,
                mensagem: "Venda criada com sucesso!",
                venda: {
                    VendaData,
                    VendaQuantidade: quantidadeInt,
                    ProdutoId,
                    Cliente,
                    valorTotal
                }   
            });
        } catch (error) {
            console.error("Erro ao criar venda:", error);
            res.status(500).send("Erro ao criar venda");
        }
    },
    editarVendas: async (req, res) => {
        try {
            const { id } = req.params;
            const { VendaData, VendaQuantidade, ProdutoId, Cliente } = req.body;

            const venda = await Venda.findByPk(id);
            if (!venda) {
                return res.status(404).json({ error: "Venda não encontrada" });
            }
            const produto = await Produto.findByPk(ProdutoId);
            if (!produto) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }
            const quantidadeInt = parseInt(VendaQuantidade);
            const precoUnitario = produto.preco;
            const valorTotal = quantidadeInt * precoUnitario;
            
            await venda.update({
                VendaData: new Date(VendaData),
                VendaQuantidade,
                ProdutoId,
                Cliente
            });
            res.json({
                sucesso: true,
                mensagem: "Venda atualizada com sucesso!",
                venda: venda
            });
        } catch (error) {   
            console.error("Erro ao editar venda:", error);
            res.status(500).send("Erro ao editar venda");
        }
    }

};