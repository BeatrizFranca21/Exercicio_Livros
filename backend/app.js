const { RESOURCE_CACHE_PROVIDER } = require('@angular/platform-browser-dynamic');
const express = require('express')
const cors = require('cors')
const app = express();
const Livro = require('./models/livro')
const mongoose = require('mongoose')


const userDB = process.env.MONGODB_USER;
const passDB = process.env.MONGODB_PASSWORD;
const clusterDB = process.env.MONGODB_CLUSTER;
const nameDB = process.env.MONGODB_DATABASE;

mongoose.connect(`mongodb://${userDB}:${passDB}@${clusterDB}.mongodb.net/${nameDB}?ssl=true&replicaSet=atlas-xrp6iy-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => console.log('MongoDB: Foi conectado'))
    .catch(() => console.log('MongoDB: Não foi conectado'))

app.use(express.json())
app.use(cors())


const livros = [{
    id: '2',
    titulo: 'Branca de Neve',
    autor: 'Walter',
    numpaginas: '250'
}]


app.post('/api/livros', (req, res, next) => {
    // const livro = req.body
    // console.log(livro)
    const livro = new Livro({
        //id: req.body.id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        numpaginas: req.body.numpaginas
    })
    livro.save().then(livroInserido => {
        res.status(201).json({ mensagem: 'Livro Inserido', id: livroInserido._id })

    })
})

app.get('/api/livros', (req, res, next) => {
    Livro.find().then(documents => {
        res.status(200).json({
            mensagem: "Tudo OK",
            livros: documents
        });
    })
});

app.delete('/api/livros/:id', (req, res, next) => {
    Livro.deleteOne({ _id: req.params.id }).then((resultado) => {
        console.log(resultado);
        res.status(200).json({ mensagem: "Livro Removido" });

    });
});


module.exports = app;
