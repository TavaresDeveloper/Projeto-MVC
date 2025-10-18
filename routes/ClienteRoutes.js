const express = require('express');
const router = express.Router();
const Cliente = require('../modules/Cliente.js');
const clienteController = require('../controller/ClienteController.js');
const multer = require('multer');
const path = require('path');

router.post('/add', clienteController.criarCliente);
router.get('/listar', clienteController.listarClientes);
router.put('/edit/:id', clienteController.editarCliente);
router.delete('/delete/:id', clienteController.deletarCliente);


module.exports = router;