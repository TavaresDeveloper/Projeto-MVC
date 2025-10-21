
const Cliente = require('../modules/Cliente.js');


module.exports = {
    criarCliente: async (req, res) => {
        try {
            let { ClienteNome } = req.body;
            await Cliente.create({
                ClienteNome
            });
            res.redirect("/Clientes");
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            res.status(500).send("Erro ao criar cliente");
        }   
    },

    listarClientes: async (req, res) => {
        try {
            const Clientes = await Cliente.findAll();
            res.status(200).render("Clientes", {
                Clientes: Clientes
            });
        } catch (error) {
            console.error("Erro ao listar clientes:", error);
            res.status(500).send("Erro ao listar clientes");
        }   
    },

    editarCliente: async (req, res) => {
        try {
        const ClienteID = req.params.id;
        const {ClienteNome} = req.body;

        if (!ClienteID) {
            return res.status(404).send("Cliente não encontrado");
        }

         await Cliente.update({
            ClienteNome: ClienteNome
        }, {
            where: { ClienteID: ClienteID }
        });

        res.redirect('/Clientes', { ClienteID, ClienteNome });
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        res.status(500).send("Erro ao buscar cliente");
    }
    },

    deletarCliente: async (req, res) => {
        try {
            let  ClienteID  = req.params.id;
            await Cliente.destroy({
                where: { ClienteID: ClienteID }
            });
            res.redirect("/Clientes");
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            res.status(500).send("Erro ao deletar cliente");
        }
    }
};
