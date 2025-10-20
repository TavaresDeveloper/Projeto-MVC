const Produto = require('../modules/Produto.js');
const Categoria = require('../modules/Categoria.js');
const SubCategoria = require('../modules/SubCategoria.js');

module.exports = {
    listarSubCategorias: async (req, res) => {
        try {
            const subCategorias = await SubCategoria.findAll();
            const categorias = await Categoria.findAll();
            res.status(200).render("subcategorias", {
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
            let { SubCategoriaNome, CategoriaID} = req.body;
            await SubCategoria.create({

                SubCategoriaNome: SubCategoriaNome,
                CategoriaID: CategoriaID
            });
            res.redirect("/subcategorias");
        } catch (error) {
            console.error("Erro ao criar subcategoria:", error);
            res.status(500).send("Erro ao criar subcategoria");
        }
    },

    editarSubCategoria: async (req, res) => {
        try {
            let  SubCategoriaID  = req.params.id;
            let { SubCategoriaNome} = req.body;
            await SubCategoria.update({
                SubCategoriaNome
            }, 
            {
                where: { SubCategoriaID: SubCategoriaID }
            });
            res.redirect("/subcategorias");
        } catch (error) {
            console.error("Erro ao editar subcategoria:", error);
            res.status(500).send("Erro ao editar subcategoria");
        }   
    },
    deletarSubCategoria: async (req, res) => {
        try {
            let { SubCategoriaID } = req.params.id;
            await SubCategoria.destroy({
                where: { SubCategoriaID: SubCategoriaID }
            });
            res.redirect("/subcategorias");
        } catch (error) {
            console.error("Erro ao deletar subcategoria:", error);
            res.status(500).send("Erro ao deletar subcategoria");
        }
    }
                

};  