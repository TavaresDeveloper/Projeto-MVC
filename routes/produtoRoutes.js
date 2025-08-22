const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtoController.js');  


router.get('/', produtoController.listarProdutos);
router.post('/add', produtoController.criarProduto);

module.exports = router;