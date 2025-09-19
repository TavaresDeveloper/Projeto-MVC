const express = require('express');
const api = express();
const produtoRouter = require('./routes/produtoRoutes.js');
const sequelize = require('./config/database.js');
const Produto = require('./modules/Produto.js');
const path = require('path');
const port = 3000;



 api.set('view engine', 'ejs');
 api.set('views',__dirname + '/views');
 api.use(express.urlencoded({ extended: true }));
 api.use(express.json());
 api.use('/Produto', produtoRouter);
 api.use('/public', express.static(path.join(__dirname, 'public')));


 api.get('/', (req, res) => {
  Produto.findAll().then(produtos => {
    res.render('index', { title: 'Lista de Produtos', produtos: produtos });
  });
  
 });



 sequelize.sync()
      .then(() => {
     console.log('Banco de dados sincronizado!');

     api.listen(3000, () => {
       console.log(`Servidor rodando na porta ${port}`);
     });
   });


