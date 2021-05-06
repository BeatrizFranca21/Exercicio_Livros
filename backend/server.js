require('dotenv').config()
const { RequiredValidator } = require('@angular/forms');
const http = require('http');
const app = require('../backend/app');
const port = process.env.PORT;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);