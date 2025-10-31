const vendedorController = require('../controllers/VendedorController');
const vendedor = require('../modules/Vendedor');
const express = require('express');
const router = express.Router();

router.get('/', vendedorController.listarVendedores);
router.post('/add', vendedorController.criarVendedor);
router.post('/:id', vendedorController.deletarVendedor);