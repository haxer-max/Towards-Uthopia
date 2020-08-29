const User = require("../models/users");

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
                        console.log(user);
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

    /*  
  { 
    id: '114699178440820194733',
    displayName: 'Incredible Grim',
    name: { 
        familyName: 'Grim', 
        givenName: 'Incredible' 
    },
    emails: [ { value: 'atharvashrawge@gmail.com', verified: true } ],
    
    photos:[ 
        { value:
          'https://lh3.googleusercontent.com/a-/AOh14GiH87_JIscVCjKxlHYkzC6Ya8GvQfffh6YqEFEIxA' } 
    ],
    
    provider: 'google',
    
    _raw:
     '{\n  "sub": "114699178440820194733",\n  "name": "Incredible Grim",\n  "given_name": "Incredible",\n  "family_name": "Grim",\n  "picture": "https://lh3.googleusercontent.com/a-/AOh14GiH87_JIscVCjKxlHYkzC6Ya8GvQfffh6YqEFEIxA",\n  "email": "atharvashrawge@gmail.com",\n  "email_verified": true,\n  "locale": "en-GB"\n}',
    _json:
     { sub: '114699178440820194733',
       name: 'Incredible Grim',
       given_name: 'Incredible',
       family_name: 'Grim',
       picture:
        'https://lh3.googleusercontent.com/a-/AOh14GiH87_JIscVCjKxlHYkzC6Ya8GvQfffh6YqEFEIxA',
       email: 'atharvashrawge@gmail.com',
       email_verified: true,
       locale: 'en-GB' } }
*/
};
