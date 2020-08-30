//importing modules
const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const passport = require("passport");


const indexRouter = require("./api/routes/other/index");

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

// view engine setup
app.set("views", path.join(__dirname, "frontend/views"));
app.set("view engine", "ejs");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/public")));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.use(cors({
    origin: 'http://localhost:4000'
}))

//configuring passport
require('./api/config/passport_strategies')(passport);
app.use(passport.initialize());

/*using routes */
app.use("/", indexRouter);

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