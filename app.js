//importing modules
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');

const { google } = require('googleapis');
const OAuth2Data = require('./google_key.json')

//connecting to db
mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
        console.log(`DB Connection Error: ${err.message}`);
    });

//

/*importing routes */
const indexRouter = require("./api/routes/index");
const usersRouter = require("./api/routes/users");
const blogsRouter = require("./api/routes/blogs");
const profileRouter = require("./api/routes/profile");

//

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "frontend/views"));
app.set("view engine", "ejs");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/public")));
app.use(cors({
    origin: 'http://localhost:4000'
}
))
//

const User = require("./api/models/users");
const passport = require("passport");

require('./api/config/passport_strategies')(passport);



app.use(passport.initialize());
//


app.get('/auth/google',
  passport.authenticate('google', {session: false, scope: ['profile', 'email'] }),
  /*(req,res)=>{
      console.log("1")
      res.send(req.user);
  }*/
  );

app.get('/auth/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("2")
    res.redirect('/protecg');
  });


/*using routes */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);
app.use("/profile", profileRouter);

//

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
