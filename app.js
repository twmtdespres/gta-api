// const path = require('path');
const express = require('express');
// const httpError = require('http-errors');
//const logger = require('morgan');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const compress = require('compression');
// const methodOverride = require('method-override');
// const cors = require('cors');
const helmet = require('helmet');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const config = require('./config/config');
// const passport = require('./passport')

const app = express();

//Logger
// if (config.env === 'development') {
//     app.use(logger('dev'));
// }

app.use(express.json());

// secure apps by setting various HTTP headers
app.use(helmet());

// // enable CORS - Cross Origin Resource Sharing
// app.use(cors());


// API router
app.use('/auth', authRoutes);

// API router
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.sendStatus(404);
    //const err = new httpError(404)
    //return next(err);
});

const port = config.port;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
