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
        let { ProdutoNome, ProdutoQTD, ProdutoPreco, ProdutoImagem, ProdutoCategoria } = req.body;

        // Se houver arquivo, atualiza o nome da imagem
        if (req.file) {
            ProdutoImagem = req.file.filename;
        }

        // Função para converter preço no formato BR para número float
        function parsePreco(valorStr) {
            if (typeof valorStr !== 'string') return NaN;
            valorStr = valorStr.replace(/\./g, ''); // remove pontos de milhar
            valorStr = valorStr.replace(',', '.');  // substitui vírgula por ponto decimal
            return parseFloat(valorStr);
        }

        // Converte o preço
        const precoConvertido = parsePreco(ProdutoPreco);

        if (isNaN(precoConvertido)) {
            return res.status(400).send("Preço inválido");
        }

        // Converte ProdutoQTD para número inteiro
        const qtdConvertida = parseInt(ProdutoQTD, 10);
        if (isNaN(qtdConvertida) || qtdConvertida < 1) {
            return res.status(400).send("Quantidade inválida");
        }

        // Cria o produto com os dados convertidos
        await Produto.create({
            ProdutoNome,
            ProdutoQTD: qtdConvertida,
            ProdutoPreco: precoConvertido,
            ProdutoImagem,
            ProdutoCategoria
        });

        res.redirect("/Produto");

    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).send("Erro ao criar produto");
    }
},
    editarProduto: async (req, res) => {
        try {
            let { id } = req.params;
            let { ProdutoNome, ProdutoQTD, ProdutoPreco, ProdutoCategoria} = req.body;
            let ProdutoImagem;
            if(req.file) {
                ProdutoImagem = req.file.filename;
                await Produto.update({
                    ProdutoNome,
                    ProdutoQTD,
                    ProdutoPreco,
                    ProdutoImagem,
                    ProdutoCategoria
                }, {
                    where: { id: id }
                });
            } else {
                await Produto.update({
                    ProdutoNome,
                    ProdutoQTD,
                    ProdutoPreco,
                    ProdutoCategoria
                }, {
                    where: { id: id }
                });
            }
            res.redirect("/Produto");
        } catch (error) {
            console.error("Erro ao editar produto:", error);
            res.status(500).send("Erro ao editar produto");
        }   
    },

    deletarProduto: async (req, res) => {
        try {
             let id = req.params.id;
            await Produto.destroy({
                where: { ProdutoID: id }
            });
            res.redirect("/");
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            res.status(500).send("Erro ao deletar produto");
        }
    }
    
};