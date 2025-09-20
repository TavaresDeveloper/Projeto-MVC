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
            let { ProdutoNome, ProdutoQTD, ProdutoPreco, ProdutoImagem } = req.body;
            if(req.file) {
                ProdutoImagem = req.file.filename; 
            }
            await Produto.create({
                ProdutoNome,
                ProdutoQTD,
                ProdutoPreco,
                ProdutoImagem
            });
            res.redirect("/Produto");
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(500).send("Erro ao criar produto");
        }
    }
    
};