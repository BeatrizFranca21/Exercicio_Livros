const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const livroRoutes = require('./rotas/livros');


const userDB = process.env.MONGODB_USER;
const passDB = process.env.MONGODB_PASSWORD;
const clusterDB = process.env.MONGODB_CLUSTER;
const nameDB = process.env.MONGODB_DATABASE;

mongoose.connect(`mongodb://${userDB}:${passDB}@${clusterDB}.mongodb.net/${nameDB}?ssl=true&replicaSet=atlas-xrp6iy-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => console.log('MongoDB: Foi conectado'))
    .catch((erro) => console.log('MongoDB: COnexao NOK: ' + erro))

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/livros', livroRoutes);

module.exports = app;
// const livros = [{
//     id: '2',
//     titulo: 'Branca de Neve',
//     autor: 'Walter',
//     numpaginas: '250'
// }]


// app.post('/api/livros', (req, res, next) => {
//     // const livro = req.body
//     // console.log(livro)
//     const livro = new Livro({
//         //id: req.body.id,
//         titulo: req.body.titulo,
//         autor: req.body.autor,
//         numpaginas: req.body.numpaginas
//     })
//     livro.save().then(livroInserido => {
//         res.status(201).json({ mensagem: 'Livro Inserido', id: livroInserido._id })

//     })
// })
// app.get('/api/livros/:id', (req, res, next) => {
//     Livro.findById(req.params.id).then(livro => {
//         if (livro) {
//             res.status(200).json(livro);
//         } else {
//             res.status(404).json({ mensagem: "Livro não encontrado!" })
//         }
//     })
// });

// app.delete('/api/livros/:id', (req, res, next) => {
//     Livro.deleteOne({ _id: req.params.id }).then((resultado) => {
//         console.log(resultado);
//         res.status(200).json({ mensagem: "Livro Removido" });

//     });
// });

// app.put("/api/livros/:id", (req, res, next) => {
//     const livro = new Livro({
//         _id: req.params.id,
//         titulo: req.body.titulo,
//         autor: req.body.autor,
//         numpaginas: req.body.numpaginas
//     });
//     Livro.updateOne({ _id: req.params.id }, livro)
//         .then((resultado) => {
//             console.log(resultado)
//         });
//     res.status(200).json({ mensagem: 'Atualização realizada com sucesso' })
// });
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', "*");
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE,OPTIONS');
//     next();
// });
