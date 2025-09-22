const Produto = require('../modules/Produto');
const Categoria = require('../modules/Categoria');

module.exports = {
    listarProdutos: async (req, res) => {
        try {
            const produtos = await Produto.findAll();
            const categorias = await Categoria.findAll();
            res.status(200).render("index", {
                produtos: produtos,
                categorias: categorias
            });
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            res.status(500).send("Erro ao listar produtos");
        };

    },

    criarProduto: async (req, res) => {
        try {
            let { ProdutoNome, ProdutoQTD, ProdutoPreco, ProdutoImagem, ProdutoCategoria} = req.body;
            if(req.file) {
                ProdutoImagem = req.file.filename; 
            }
            await Produto.create({
                ProdutoNome,
                ProdutoQTD,
                ProdutoPreco,
                ProdutoImagem,
                ProdutoCategoria
            });
            res.redirect("/Produto");
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(500).send("Erro ao criar produto");
        }
    }
    
};