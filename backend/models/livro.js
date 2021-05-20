const mongoose = require('mongoose');
const livroSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    numpaginas: { type: String, required: true },
    imagemURL: { type: String, required: true }
});

module.exports = mongoose.model('Livro', livroSchema);