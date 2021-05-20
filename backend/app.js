const path = require('path');
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const livroRoutes = require('./rotas/livros');


const userDB = process.env.MONGODB_USER;
const passDB = process.env.MONGODB_PASSWORD;
const clusterDB = process.env.MONGODB_CLUSTER;
const nameDB = process.env.MONGODB_DATABASE;

mongoose.connect(`mongodb://${userDB}:${passDB}@${clusterDB}.mongodb.net/${nameDB}?ssl=true&replicaSet=atlas-xrp6iy-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => console.log('MongoDB: Conexao OK'))
    .catch((erro) => console.log('MongoDB: COnexao NOK: ' + erro))

const app = express()
app.use(express.json())
app.use('/imagens', express.static(path.join('backend/imagens')));
app.use(cors())

app.use('/api/livros', livroRoutes);


module.exports = app;