const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const updateRouter = require('./routes/update');
const historyRouter = require('./routes/history');
const settingsRouter = require('./routes/settings');
const deploymentRouter = require('./routes/deployment');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'password',
  resave: false,
  saveUninitialized: false,
}));


//
// routes
//

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/update', updateRouter);
app.use('/history', historyRouter);
app.use('/settings', settingsRouter);
app.use('/deployment', deploymentRouter);


//
// locals
//

/**
 * Helper function that allows for more concise if-and-only-if
 * style conditional within EJS.
 *
 * @param {bool} condition expression that results in a boolean
 * @param {any} value the value to apply if the condition is true
 *
 * @example <div class="<% if(condition){ %>selected<% } %>">Test</div>
 */
app.locals.iif = (condition, value) => {
  if (condition) return value;
  return '';
};


/**
 * Helper function that returns a value between 0 and a given number.
 * @param {number} ceiling the highest allowed random value to return
 */
app.locals.randInt = ceiling => {
  return Math.floor(Math.random() * Math.floor(ceiling));
};


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
