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
            res.render("categorias", {
                categorias: categorias
            });
        } catch (error) {
            console.error("Erro ao listar categorias:", error);
            res.status(500).send("Erro ao listar categorias");
        }
    },
    editarCategoria: async (req, res) => {
        try {
            let { CategoriaID } = req.params.id;
            let { CategoriaNome } = req.body;
            await categoria.update({
                CategoriaNome
            }, {
                where: { CategoriaID: CategoriaID }
            });
            res.redirect("/Categoria/listar");
        } catch (error) {
            console.error("Erro ao editar categoria:", error);
            res.status(500).send("Erro ao editar categoria");
        }   
    },

    deletarCategoria: async (req, res) => {
        try {
            let id = req.params.id;
            let { CategoriaID } = id;
            await categoria.destroy({
                where: { CategoriaID: CategoriaID }
            });
            res.redirect("/categorias");
        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
            res.status(500).send("Erro ao deletar categoria");
        }
    }
};
