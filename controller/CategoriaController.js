const categoria = require("../modules/Categoria.js");


module.exports = {
    criarCategoria: async (req, res) => {
        try {
            let { CategoriaNome } = req.body;
            await categoria.create({
                CategoriaNome
            });
            res.redirect("/Categoria/listar");
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            res.status(500).send("Erro ao criar categoria");
        }
    },

       listarCategorias: async (req, res) => {
        try {
            const categorias = await categoria.findAll({ raw: true });
            res.render("index", {
                title: "Lista de Categorias",
                categorias: categorias
            });
        } catch (error) {
            console.error("Erro ao listar categorias:", error);
            res.status(500).send("Erro ao listar categorias");
        }
    }
};
