const express = require('express');
const api = express();
const produtoRouter = require('./routes/produtoRoutes.js');
const sequelize = require('./config/database.js');
const Produto = require('./modules/Produto.js');
const path = require('path');
const Categoria = require('./modules/Categoria.js'); 
const categoriaRouter = require('./routes/categoriaRoutes.js'); 
const port = 3000;



 api.set('view engine', 'ejs');
 api.set('views',__dirname + '/views');
 api.use(express.urlencoded({ extended: true }));
 api.use(express.json());
 api.use('/Produto', produtoRouter);
 api.use('/Categoria', categoriaRouter);
 api.use('/public', express.static(path.join(__dirname, 'public')));


 api.get('/', async (req, res) => {
  try {
      const categorias = await Categoria.findAll({raw: true});
      const produtos = await Produto.findAll({raw: true});
       
       res.render('index', {
          title: 'Lista de Produtos',
          produtos: produtos,
          categorias: categorias
       });

  } catch (error) {
       console.error("Erro ao listar produtos:", error);
       res.status(500).send("Erro ao listar produtos"); 
       };

 });



 sequelize.sync()
      .then(() => {
     console.log('Banco de dados sincronizado!');

     api.listen(3000, () => {
       console.log(`Servidor rodando na porta ${port}`);
     });
   });


