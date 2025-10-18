
const Cliente = require('../modules/Cliente.js');


module.exports = {
    criarCliente: async (req, res) => {
        try {
            let { ClienteNome } = req.body;
            await Cliente.create({
                ClienteNome
            });
            res.redirect("/Cliente");
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            res.status(500).send("Erro ao criar cliente");
        }   
    },

    listarClientes: async (req, res) => {
        try {
            const clientes = await Cliente.findAll();
            res.status(200).render("cliente", {
                clientes: clientes
            });
        } catch (error) {
            console.error("Erro ao listar clientes:", error);
            res.status(500).send("Erro ao listar clientes");
        }   
    },

    editarCliente: async (req, res) => {
        try {
            let { id } = req.params;
            let { ClienteNome } = req.body;
            await Cliente.update({
                ClienteNome 
            }, {
                where: { ClienteID: id }
            });
            res.redirect("/Cliente");
        } catch (error) {
            console.error("Erro ao editar cliente:", error);
            res.status(500).send("Erro ao editar cliente");
        }
    },

    deletarCliente: async (req, res) => {
        try {
            let { id } = req.params;
            await Cliente.destroy({
                where: { ClienteID: id }
            });
            res.redirect("/Cliente");
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            res.status(500).send("Erro ao deletar cliente");
        }
    }
};
