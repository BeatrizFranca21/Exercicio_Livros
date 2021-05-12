const express = require('express');
const livro = require('../models/livro');
const Livro = require('../models/livro');
const router = express.Router();


router.post('', (req, res, next) => {

    const livro = new Livro({
        _id: req.body.id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        numpaginas: req.body.numpaginas
    });
    //console.log(cliente);
    livro.save().then(livroInserido => {
        res.status(201).json({
            mensagem: 'Livro inserido',
            id: livroInserido._id
        });
    });
});

router.get('/:id', (req, res) => {
    Livro.findById(req.params.id).then(livro => {
        if (livro)
            res.status(200).json(livro);
        else
            res.status(404).json({ mensagem: "Livro não encontrado" });
    });
});

router.get("", (req, res, next) => {
    Livro.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            mensagem: "Tudo OK",
            livros: documents
        });
    });
});

//localhost:3000/api/clientes/abcd
router.delete('/:id', (req, res) => {
    Livro.deleteOne({ _id: req.params.id }).then((resultado) => {
        console.log(resultado);
        res.status(200).json({ mensagem: 'Livro removido' });
    });
});

//http://localhost:3000/api/clientes/123456
router.put('/:id', (req, res, next) => {
    const livro = new Livro({
        _id: req.body.id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        numpaginas: req.body.numpaginas
    });
    Livro.updateOne({ _id: req.params.id }, livro)
        .then((resultado) => {
            console.log(resultado);
            res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
        });
})

module.exports = router;
