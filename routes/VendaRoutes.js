const express = require('express');
const router = express.Router();
const vendaController = require('../controller/VendaController.js');  
const Venda = require('../modules/Vendas.js');
const multer = require('multer');
const path = require('path');

router.post('/add', vendaController.criarVenda);
router.get('/', vendaController.listarVendas);
router.put('/edit/:id', vendaController.editarVendas);
router.delete('/delete/:id', vendaController.deletarVendas);

module.exports = router;