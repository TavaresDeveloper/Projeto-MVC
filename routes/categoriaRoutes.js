const express = require('express');
const router = express.Router();
const Categoria = require('../modules/Categoria.js');
const categoriaController = require('../controller/CategoriaController.js');
const multer = require('multer');
const path = require('path');

router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
        res.status(500).send("Erro ao listar categorias");
    }
});

router.post('/add', async (req, res) => {
        const { CategoriaNome } = req.body;
        try {
            const novaCategoria = await Categoria.create({ CategoriaNome });
            res.status(201).json(novaCategoria);
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            res.status(500).send("Erro ao criar categoria");
        }
    });

module.exports = router;