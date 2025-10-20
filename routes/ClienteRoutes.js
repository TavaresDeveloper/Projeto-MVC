const express = require('express');
const router = express.Router();
const Cliente = require('../modules/Cliente.js');
const clienteController = require('../controller/ClienteController.js');
const multer = require('multer');
const path = require('path');

router.post('/add', clienteController.criarCliente);
router.get('/', clienteController.listarClientes);
router.put('/:id', clienteController.editarCliente);
router.delete('/:id', clienteController.deletarCliente);


module.exports = router;