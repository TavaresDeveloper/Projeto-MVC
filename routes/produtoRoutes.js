const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtoController.js');  
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
        },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage});

router.post('/add', upload.single('ProdutoImagem'), produtoController.criarProduto);
router.get('/', produtoController.listarProdutos);
router.post('/add', produtoController.criarProduto);

module.exports = router;