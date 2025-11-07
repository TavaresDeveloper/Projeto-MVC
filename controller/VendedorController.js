const vendedor = require('../modules/Vendedor');
const Vendas = require('../modules/Vendas');



module.exports = {
    listarVendedores: async (req, res) => {
        try {
            const vendedores = await vendedor.findAll();
            res.status(200).render("Vendedor", {
                vendedores: vendedores
            });
        } catch (error) {
            console.error("Erro ao listar vendedores:", error);
            res.status(500).send("Erro ao listar vendedores");
        }
},

    criarVendedor: async (req, res) => {
        try {
            let { VendedorNome } = req.body;

            await vendedor.create({
                VendedorNome
            });

            res.redirect("Vendedor");

        } catch (error) {
            console.error("Erro ao criar vendedor:", error);
            res.status(500).send("Erro ao criar vendedor");
        }
    },

    deletarVendedor: async (req, res) => {
        try {
             let VendedorID = req.params.id;
            await vendedor.destroy({
                where: { VendedorID: VendedorID }
            });
            res.redirect("Vendedor");
        } catch (error) {
            console.error("Erro ao deletar vendedor:", error);
            res.status(500).send("Erro ao deletar vendedor");
        }
    }
};