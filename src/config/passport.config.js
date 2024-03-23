import passport from "passport";
import githubStrategy from "passport-github2";
import UserManagerMongo from "../dao/Mongo/userManagerMongo.js";
import passportJWT from "passport-jwt";
import { configObject } from "./connectDB.js";


const passportService = new UserManagerMongo();
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const initializePassport = () => {

  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["cookieToken"];
    }
    return token;
  };

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: configObject.jwt_private_key,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  passport.use(
    "github",
    new githubStrategy(
      {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile: ", profile);
      try {
        let user = await passportService.getUserBy({
          email: profile._json.email,
        });
        if (!user) {
          let newUser = {
            first_name: profile._json.name,
            last_name: "",
            email: profile._json.email,
            password: "",
            logged_from: "github",
          };
          let result = await passportService.createUsers(newUser);
          return done(null, result);
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
    )
    );
    
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser(async (id, done) => {
      let user = await passportService.getUserBy({ _id: id });
      done(null, user);
    });
  };
    export default initializePassport;
    