const express = require('express');
const multer = require('multer');
const Livro = require('../models/livro')
const router = express.Router();

const MIME_TYPE_EXTENSAO_MAPA = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/bmp': 'bmp'
}

const armazenamento = multer.diskStorage({
    destination: (req, file, callback) => {
        let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype] ? null : new Error('Mime Type Inválido');
        callback(e, 'backend/imagens')
    },
    filename: (req, file, callback) => {
        const nome = file.originalname.toLowerCase().split(" ").join('-');
        const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
        callback(null, `${nome}-${Date.now()}.${extensao}`)
    }
});



router.post('', multer({ storage: armazenamento }).single('imagem'), (req, res, next) => {
    const imagemURL = `${req.protocol}://${req.get('host')}`;
    const livro = new Livro({
        titulo: req.body.titulo,
        autor: req.body.autor,
        numpaginas: req.body.numpaginas,
        imagemURL: `${imagemURL}/imagens/${req.file.filename}`
    });
    //console.log(cliente);
    livro.save().then(livroInserido => {
        res.status(201).json({
            mensagem: 'Livro inserido',
            livro: {
                id: livroInserido._id,
                titulo: livroInserido.titulo,
                autor: livroInserido.autor,
                numpaginas: livroInserido.numpaginas,
                imagemURL: livroInserido.imagemURL,
            }
        });
    });
});

router.get('/:id', (req, res) => {
    Livro.findById(req.params.id).then(li => {
        if (li)
            res.status(200).json(li);
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
        _id: req.params.id,
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