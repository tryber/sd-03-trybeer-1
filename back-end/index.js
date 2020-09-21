const express = require('express');
const { errorHandler } = require('./middlewares');
const routers = require('./routers/index');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', routers.login);
app.use(errorHandler);

app.listen(3001, console.log(`listen on port ${3001}`));
