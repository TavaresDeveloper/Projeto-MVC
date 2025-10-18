
const Venda = require('../modules/Vendas.js');
const Produto = require('../modules/Produto.js');
const Cliente = require('../modules/Cliente.js');
const Categoria = require('../modules/Categoria.js');


module.exports = {
    listarVendas: async (req, res) => {
        try {
            const vendas = await Venda.findAll({
                include: [
                    {
                        model: Produto,
                        as: 'produto',
                        include: [{
                            model: Categoria,
                            as: 'categoria'
                        }]
                    },
                    {
                        model: Cliente,
                        as: 'dadosCliente'
                    }
                ],
            
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
                vendas: vendas,
                totalVendas: totalVendas,
                valorTotalVendas: valorTotalVendas,
                produtosVendidos: produtosVendidos
            });
            
        } catch (error) {
            console.error("Erro ao listar vendas:", error);
            res.status(500).send("Erro ao listar vendas");
        }   
    },

    criarVenda: async (req, res) => {
        try {
            let { VendaData, VendaQuantidade, ProdutoId, Cliente, observacoes } = req.body;
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
    },
    deletarVendas: async (req, res) => {
        try {
            const { id } = req.params;
            const venda = await Venda.findByPk(id);
            if (!venda) {
                return res.status(404).json({ error: "Venda não encontrada" });
            }
            await venda.destroy();
            res.json({
                sucesso: true,
                mensagem: "Venda deletada com sucesso!"
            });
        } catch (error) {
            console.error("Erro ao deletar venda:", error);
            res.status(500).send("Erro ao deletar venda");
        }
    },

    obterPorId: async (req, res) => {
        try {
            const { id } = req.params;

            const venda = await Venda.findByPk(id, {
                include: [{
                    model: Produto,
                    as: 'produto',
                    include: [{ 
                        model: Categoria,
                        as: 'categoria'
                    }]
                }]
            });
            if (!venda) {
                return res.status(404).json({ error: "Venda não encontrada" });
            }   
            res.status(200).json(venda);
        } catch (error) {
            console.error("Erro ao obter venda por ID:", error);
            res.status(500).send("Erro ao obter venda por ID");
        }
    }

};