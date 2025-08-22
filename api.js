const express = require('express');
const api = express();
const produtoRouter = require('./routes/produtoRoutes.js');
const sequelize = require('./config/database.js');
const Produto = require('./modules/Produto.js');
const port = 3000;



 api.set('views engine', 'ejs');
 api.use(express.urlencoded({ extended: true }));

 api.use('/Produto', produtoRouter);
 
 sequelize.sync()
      .then(() => {
     console.log('Banco de dados sincronizado!');

     api.listen(3000, () => {
       console.log(`Servidor rodando na porta ${port}`);
     });
   });


