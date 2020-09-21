const express = require('express');
const { errorHandler } = require('./middlewares');
const app = express();
const routers = require('./routers/index');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req) => console.log(req.body, req.path));
app.use('/login', routers.login);
app.use(errorHandler);

app.listen(3001, console.log(`listen on port ${3001}`));
