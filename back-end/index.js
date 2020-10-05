const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const routers = require('./routers/index');
const { errorHandler } = require('./middlewares');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'images')));

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, 'images'),
//   filename: (req, file, cb) => {
//     cb(null, `${req.params.id}.jpeg`);
//   },

// });

// const upload = multer({ storage }).single('image');
// app.use('/images', storage)
// app.use((req, _res, next) => console.log(req.path, req.body) && next());
app.use('/login', routers.login);

app.use('/register', routers.register);

app.use('/profile', routers.profile);

app.use('/products', routers.products);

app.use('/admin', routers.admin);

app.use('/orders', routers.orders);

app.use('/checkout', routers.checkout);

app.use(errorHandler);
app.listen(3001, console.log(`listen on port ${3001}`));
