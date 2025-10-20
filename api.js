const express = require('express');
const api = express();
const methodOverride = require('method-override');
const produtoRouter = require('./routes/produtoRoutes.js');
const sequelize = require('./config/database.js');
const Produto = require('./modules/Produto.js');
const path = require('path');
const Categoria = require('./modules/Categoria.js'); 
const categoriaRouter = require('./routes/categoriaRoutes.js'); 
const SubCategoria = require('./modules/SubCategoria.js');
const subCategoriaRouter = require('./routes/subCategoriaRoutes.js');
const Venda = require('./modules/Vendas.js');
const vendaRouter = require('./routes/VendaRoutes.js');
const Cliente = require('./modules/Cliente.js');
const clienteRouter = require('./routes/ClienteRoutes.js');

const port = 3000;



 api.set('view engine', 'ejs');
 api.set('views',__dirname + '/views');
 api.use(express.urlencoded({ extended: true }));
 api.use(express.json());
 api.use('/Produto', produtoRouter);
 api.use('/Categoria', categoriaRouter);
 api.use('/SubCategoria', subCategoriaRouter);
 api.use('/Venda', vendaRouter);
 api.use('/Cliente', clienteRouter);
 api.use('/public', express.static(path.join(__dirname, 'public')));
 api.use(methodOverride('_method'));


      try{
         Produto.hasMany(Venda, {foreignKey: 'produtoID', as: 'vendas'});
         Venda.belongsTo(Produto, {foreignKey: 'produtoID', as: 'produto'});

         Cliente.hasMany(Venda, {foreignKey: 'ClienteId', as: 'vendas'});
         Venda.belongsTo(Cliente, {foreignKey: 'ClienteId', as: 'dadosCliente'});

         Categoria.hasMany(Produto, {foreignKey: 'ProdutoCategoria', as: 'produtos'});
         Produto.belongsTo(Categoria, {foreignKey: 'ProdutoCategoria', as: 'categoria'});

      } catch(error){
         console.error("Erro ao definir associações:", error);
      }

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

  api.get('/categorias', async (req, res) => {
     try {
         const categorias = await Categoria.findAll({raw: true});
          
          res.render('categorias', {
             title: 'Lista de Categorias',
             categorias: categorias
          });

     } catch (error) {
          console.error("Erro ao listar categorias:", error);
          res.status(500).send("Erro ao listar categorias"); 
        };

  });

  api.get('/subcategorias', async (req, res) => {
     try {
         const subcategorias = await SubCategoria.findAll({raw: true});
         const categorias = await Categoria.findAll({raw: true});
          
          res.render('subcategorias', {
             title: 'Lista de SubCategorias',
               categorias: categorias,
             subcategorias: subcategorias
          });

     } catch (error) {
          console.error("Erro ao listar subcategorias:", error);
          res.status(500).send("Erro ao listar subcategorias"); 
        };

  });

  api.get('/vendas', async (req, res) => {
     try {
         const vendas = await Venda.findAll({raw: true});
          
          res.render('vendas', {
             title: 'Lista de Vendas',
             vendas: vendas
          });

     } catch (error) {
          console.error("Erro ao listar vendas:", error);
          res.status(500).send("Erro ao listar vendas"); 
        };

  });

   api.get('/clientes', async (req, res) => {
       try {
             const Clientes = await Cliente.findAll({raw: true});
               res.render('Cliente', {
                  title: 'Lista de Clientes',
                  Clientes: Clientes
               });
               
        } catch (error) {
             console.error("Erro ao listar clientes:", error);
             res.status(500).send("Erro ao listar clientes"); 
           };
           
   });
  



 sequelize.sync()
      .then(() => {
     console.log('Banco de dados sincronizado!');

     api.listen(3000, () => {
       console.log(`Servidor rodando na porta ${port}`);
     });
   });


