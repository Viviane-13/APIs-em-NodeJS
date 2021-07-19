import express from 'express';

const server = express();
server.use(express.json());

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'alunos'
  }
});

//Listagem de todos os alunos
server.get('/alunos', (req, res) => {
  knex('cadastro').then((dados) => {
      res.send(dados)
  });
});
//Buscando por um único cadastro
server.get('/alunos/:id', (req, res) => {
  const {id} = req.params;
  knex('cadastro').where("id",id).first()
  .then((dados) => {
      res.send(dados)
  });
});
//Criando um novo cadastro de aluno
server.post('/create-cadastro',(req, res) =>{
  knex('cadastro').insert(req.body).then((dados) =>{
    res.send(dados);
  });
});
//Atualizando cadastro
server.put('/update-cadastro/:id', (req, res) =>{
  const {id} = req.params;
  knex('cadastro').where("id",id).update(req.body).then((dados)=>{
    if(!dados){
      return res.status(400).json({error: "Cadastro não existente!"});
    }
    res.send('Dados atualizados com sucesso!');
  });
});

//Deletando cadastro
server.delete('/delete-cadastro/:id',(req,res) => {
  const {id} = req.params;

  knex('cadastro').where("id",id).delete(req.body).then((dados)=>{
    if(!dados){
      return res.status(400).json({error: "Não foi possivel deletar o cadastro!"});
    }
    res.send('Cadastro excluido com sucesso!');
  });
});

server.listen(3000);