const express = require('express');
const router = express.Router();
const subCategoriaController = require('../controller/subCategoriaController.js');  
const SubCategoria = require('../modules/SubCategoria.js');
const multer = require('multer');
const path = require('path');

router.post('/add', subCategoriaController.criarSubCategoria);
router.get('/', subCategoriaController.listarSubCategorias);

router.delete('/delete/:subCategoriaID', (req, res) => {
    const subCategoriaId = req.params.subCategoriaID;
    SubCategoria.destroy({ where: { subCategoriaID: subCategoriaId } })
        .then(result => {
            if (result > 0) {
                res.status(200).send('SubCategoria excluída com sucesso');
            } else {
                res.status(404).send('SubCategoria não encontrada');
            }
        })
        .catch(err => {
            res.status(500).send('Erro ao excluir a SubCategoria');
        });

});

module.exports = router;