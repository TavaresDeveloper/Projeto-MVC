const express = require('express');
const api = express();
const produtoRouter = require('./routes/produtoRoutes.js');
const sequelize = require('./config/database.js');
const Produto = require('./modules/Produto.js');
const port = 3000;



 api.set('view engine', 'ejs');
 api.set('views',__dirname + '/views');
 api.use(express.urlencoded({ extended: true }));

 api.use('/Produto', produtoRouter);

 api.get('/', (req, res) => {
   res.render('index', { title: 'Bem-vindo ao sistema de produtos' });
 });


 api.post('/Produto', async (req, res) => {
   try {
     const { nome, preco, descricao } = req.body;
     await Produto.create({ nome, preco, descricao });
     res.redirect('/Produto');
   } catch (error) {
     res.status(500).send('Erro ao criar produto: ' + error.message);
   }
 });
 
 sequelize.sync()
      .then(() => {
     console.log('Banco de dados sincronizado!');

     api.listen(3000, () => {
       console.log(`Servidor rodando na porta ${port}`);
     });
   });


