const User = require('../models/users')

//
const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

//
const GoogleStrategy = require("passport-google-oauth20").Strategy;



module.exports = (passport) => {

    //
    passport.use(
        new JwtStrategy(options, async (payload, next) => {
            User.findById(payload.id)
                .exec()
                .then((user) => {
                    //console.log(req.isAuthenticated())
                    next(null, user);
                });
        })
    );

    //
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URI,
            },
            async function (accessToken, refreshToken, profile, cb) {
                try {
                    console.log(profile);
                    user = await User.findOne({ googleId: profile.id }).exec();
                    if (user) {
                        //console.log("4" + user);
                        return cb(null, user);
                    }
                    //console.log("5");
                    user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        googleId: profile.id,
                    });
                    //console.log("6" + user);
                    await user.save();
                    //console.log("7");
                    return cb(null, user);
                } catch (error) {
                    //console.log("8 " + error);
                    return cb(error);
                }
            }
        )
    );




};
