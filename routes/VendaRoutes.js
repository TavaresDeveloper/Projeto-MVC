const express = require('express');
const router = express.Router();
const vendaController = require('../controller/VendaController.js');  
const Venda = require('../modules/Venda.js');
const multer = require('multer');
const path = require('path');

router.post('/add', vendaController.criarVenda);
router.get('/', vendaController.listarVendas);
router.put('/edit/:id', vendaController.editarVenda);
router.delete('/delete/:id', (req, res) => {
    const vendaId = req.params.id;
    Venda.destroy({ where: { id: vendaId } })
        .then(result => {
            if (result > 0) {
                res.status(200).send('Venda excluída com sucesso');
            } else {
                res.status(404).send('Venda não encontrada');
            }   
        })
        .catch(err => {
            res.status(500).send('Erro ao excluir a Venda');
        }); 
});

module.exports = router;