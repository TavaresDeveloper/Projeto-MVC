const express = require('express');
const router = express.Router();
const Categoria = require('../modules/Categoria.js');
const categoriaController = require('../controller/CategoriaController.js');
const multer = require('multer');
const path = require('path');

router.post('/add', categoriaController.criarCategoria);
router.get('/listar', categoriaController.listarCategorias);
router.put('/edit/:id', categoriaController.editarCategoria);
router.delete('/delete/:id', categoriaController.deletarCategoria);



module.exports = router;