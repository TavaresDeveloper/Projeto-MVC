const Produto = require('../modules/Produto');

module.exports = {
    listarProdutos: async (req, res) => {
        try {
            const produtos = await Produto.findAll();
            res.status(200).render("index", { produtos });
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            res.status(500).send("Erro ao listar produtos");
        };

    },

    criarProduto: async (req, res) => {
        try {
            const { ProdutoNome, ProdutoQTD, ProdutoPreco } = req.body; 
            await Produto.create({
                ProdutoNome,
                ProdutoQTD,
                ProdutoPreco
            });
            res.redirect("/");
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(500).send("Erro ao criar produto");
        }
    }
    
};