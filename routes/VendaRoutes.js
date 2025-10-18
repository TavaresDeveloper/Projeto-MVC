const express = require('express');
const router = express.Router();
const vendaController = require('../controller/VendaController.js');  
const Venda = require('../modules/Venda.js');
const multer = require('multer');
const path = require('path');

router.post('/add', vendaController.criarVenda);
router.get('/', vendaController.listarVendas);
router.put('/edit/:id', vendaController.editarVenda);
router.delete('/delete/:id', vendaController.deletarVenda);

module.exports = router;