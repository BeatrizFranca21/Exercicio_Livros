const { RESOURCE_CACHE_PROVIDER } = require('@angular/platform-browser-dynamic');
const express = require('express')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())

const livros = [{
    id: '2',
    titulo: 'Branca de Neve',
    autor: 'Walter',
    numpaginas: '250'
}]


app.post('/api/livros', (req, res, next) => {
    const livro = req.body
    console.log(livro)
    res.status(201).json({ mensagem: 'Livro Inserido' })
})

app.use("/api/livros", (req, res, next) => {
    res.status(200).json({
        mensagem: "tudo oK",
        livros: livros
    })
})

module.exports = app;