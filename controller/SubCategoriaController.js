const Produto = require('../modules/Produto');
const Categoria = require('../modules/Categoria');
const SubCategoria = require('../modules/SubCategoria');

module.exports = {
    listarSubCategorias: async (req, res) => {
        try {
            const subCategorias = await SubCategoria.findAll();
            const categorias = await Categoria.findAll();
            res.status(200).render("subcategoria", {
                subCategorias: subCategorias,
                categorias: categorias
            });
        } catch (error) {
            console.error("Erro ao listar subcategorias:", error);
            res.status(500).send("Erro ao listar subcategorias");
        };

    },

    criarSubCategoria: async (req, res) => {
        try {
            let { SubCategoriaNome, SubCategoriaCategoria} = req.body;
            await SubCategoria.create({
                SubCategoriaNome,
                SubCategoriaCategoria
            });
            res.redirect("/SubCategoria");
        } catch (error) {
            console.error("Erro ao criar subcategoria:", error);
            res.status(500).send("Erro ao criar subcategoria");
        }
    }

};  