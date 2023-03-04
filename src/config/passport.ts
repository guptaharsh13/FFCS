import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as fs from "fs";
import * as path from "path";
import { PassportStatic } from "passport";
import { User } from "../entities/User";

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
  ignoreExpiration: true,
};

// index.js will pass the global passport object here, and this function will configure it
export const passportConfig = (passport: PassportStatic) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findOneBy({
          registration_number: jwt_payload.sub,
        });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
