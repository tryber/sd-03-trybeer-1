const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { errorHandler } = require('./middlewares');
const routers = require('./routers/index');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', routers.login);

app.use('/register', routers.register);

app.use('/profile', routers.profile);

app.use(errorHandler);
app.listen(3001, console.log(`listen on port ${3001}`));
