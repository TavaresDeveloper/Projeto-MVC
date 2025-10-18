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

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { CategoriaNome } = req.body;
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).send("Categoria não encontrada");
        }
        categoria.CategoriaNome = CategoriaNome;
        await categoria.save();
        res.status(200).json(categoria);
    } catch (error) {
        console.error("Erro ao editar categoria:", error);
        res.status(500).send("Erro ao editar categoria");
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await Categoria.destroy({ where: { id: id } });
        if (resultado === 0) {
            return res.status(404).send("Categoria não encontrada");
        }
        res.status(200).send("Categoria excluída com sucesso");
    } catch (error) {
        console.error("Erro ao deletar categoria:", error);
        res.status(500).send("Erro ao deletar categoria");
    }
});

module.exports = router;