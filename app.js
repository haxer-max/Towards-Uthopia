//importing modules
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

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

//

const User = require("./api/models/users");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};


passport.use(new JwtStrategy(options, async (payload, next) => {
    User.findById(payload.id)
        .exec()
        .then((user) => {
            //console.log(req.isAuthenticated())
            next(null, user);
        });

}));





//

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URI
  },
  async function(accessToken, refreshToken, profile, cb) {
    try
    {
        console.log("3")
        user=await User.findOne({ googleId: profile.id }).exec() 
        if(user)     
        {
            console.log("4"+ user)
            return cb(null, user);
        }
        console.log("5")
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            googleId: profile.id ,
        });
        console.log("6" +user)
        await user.save();
        console.log("7")
        return cb(null, user);
    }
    catch(error)
    {
        console.log("8 "+ error)
        return cb(error)
    }
    
  }
));



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
    res.redirect('/');
  });


/*using routes */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);

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
