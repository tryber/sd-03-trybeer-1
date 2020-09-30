const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routers = require('./routers/index');
const { errorHandler } = require('./middlewares');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req, _res, next) => console.log(req.path, req.body) && next());
app.use('/login', routers.login);

app.use('/register', routers.register);

app.use('/profile', routers.profile);

app.use('/products', routers.products);

app.use('/checkout', routers.checkout);

app.use(errorHandler);
app.listen(3001, console.log(`listen on port ${3001}`));
