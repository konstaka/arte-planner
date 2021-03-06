require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const { checkToken, checkAccess } = require('./util/auth');

// Database
mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database error: '));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS for local dev support as Vue dev server has a different port
console.log(`Running in ${process.env.NODE_ENV} mode`);
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

// Vue frontend
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Auth middlewares before accessing other routes
if (process.env.NODE_ENV === 'development') {
  console.log('Bypassing auth in dev');
  app.use((req, res, next) => {
    req.authorizedUser = {
      roles: ['admin'],
    };
    next();
  });
} else {
  app.use(checkToken);
  app.use(checkAccess);
}

// Routes
const settingsRouter = require('./routes/settings');
const operationMetaRouter = require('./routes/operationMeta');
const flexSecondsRouter = require('./routes/flexSeconds');
const targetsRouter = require('./routes/targets');
const attackersRouter = require('./routes/attackers');
const scoutsRouter = require('./routes/scouts');
const ghostsRouter = require('./routes/ghosts');
const mapSqlRouter = require('./routes/mapSql');
const userRouter = require('./routes/user');
const selectionsRouter = require('./routes/selections');
const commandsRouter = require('./routes/commands');
const artefactsRouter = require('./routes/artefacts');
const artesweepsRouter = require('./routes/artesweeps');
const catapointsRouter = require('./routes/catapoints');
const treasuriesRouter = require('./routes/treasuries');

app.use('/settings', settingsRouter);
app.use('/operationMeta', operationMetaRouter);
app.use('/flexSeconds', flexSecondsRouter);
app.use('/targets', targetsRouter);
app.use('/attackers', attackersRouter);
app.use('/scouts', scoutsRouter);
app.use('/ghosts', ghostsRouter);
app.use('/mapSql', mapSqlRouter);
app.use('/user', userRouter);
app.use('/selections', selectionsRouter);
app.use('/commands', commandsRouter);
app.use('/artefacts', artefactsRouter);
app.use('/artesweeps', artesweepsRouter);
app.use('/catapoints', catapointsRouter);
app.use('/treasuries', treasuriesRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
// Four params needed for the handler to register correctly with Express
/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
