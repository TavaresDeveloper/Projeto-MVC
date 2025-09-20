const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtoController.js');  
const Produto = require('../modules/Produto.js');
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
router.delete('/delete/:produtoID', (req, res) => {
    const produtoId = req.params.produtoID;
    Produto.destroy({ where: { produtoID: produtoId } })
        .then(result => {
            if (result > 0) {
                res.status(200).send('Produto excluído com sucesso');
            } else {
                res.status(404).send('Produto não encontrado');
            }
        })
        .catch(err => {
            res.status(500).send('Erro ao excluir o produto');
        });
});

module.exports = router;