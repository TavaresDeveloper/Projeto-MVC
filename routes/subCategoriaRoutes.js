const express = require('express');
const router = express.Router();
const subCategoriaController = require('../controller/SubCategoriaController.js');  
const SubCategoria = require('../modules/SubCategoria.js');
const multer = require('multer');
const path = require('path');

router.post('/add', subCategoriaController.criarSubCategoria);
router.get('/', subCategoriaController.listarSubCategorias);
router.put('/edit/:id', subCategoriaController.editarSubCategoria);
router.delete('/delete/:id', subCategoriaController.deletarSubCategoria);
module.exports = router;