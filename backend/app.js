const { RESOURCE_CACHE_PROVIDER } = require('@angular/platform-browser-dynamic');
const express = require('express')
const cors = require('cors')
const app = express();
const env = require('./env')
const Livro = require('./models/livro')
const mongoose = require('mongoose')
const dbName = "db_livros";
mongoose.connect(`mongodb://Fatec_ipi_20201_paoo_livros:${env.mongoPassword}@cluster0-shard-00-00.rqmnk.mongodb.net:27017,cluster0-shard-00-01.rqmnk.mongodb.net:27017,cluster0-shard-00-02.rqmnk.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-xrp6iy-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true })
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
        id: req.body.id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        numpaginas: req.body.numpaginas
    })
    livro.save();
    console.log(livro);
    res.status(201).json({ mensagem: 'Livro Inserido' })
})

app.use("/api/livros", (req, res, next) => {
    res.status(200).json({
        mensagem: "tudo oK",
        livros: livros
    });
});
app.get('/api/livros', (req, res, next) => {
    Livro.find().then(documents => {
        res.status(200).json({
            mensagem: "Tudo OK",
            livros: documents
        });
    })
});
module.exports = app;
