import * as dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import { passportConfig } from "./config/passport";
import passport from "passport";
import AppDataSource from "./config/database";

import cors from "cors";
import morgan from "morgan";

import adminRouter from "./routes/admin";
import facultyRouter from "./routes/faculty";
import courseRouter from "./routes/course";
import userRouter from "./routes/user";
import registerRouter from "./routes/register";
import timetableRouter from "./routes/timetable";

import { isAdmin, isAdminOrStudent, isStudent } from "./middleware/auth";

const app: Express = express();

const PORT: number = Number(process.env.PORT) || 3000;

passportConfig(passport);
app.use(passport.initialize());

app.use(morgan(process.env.NODE_ENV == "production" ? "common" : "dev"));
app.use(express.json());

app.use(cors());

const authenticate = passport.authenticate("jwt", { session: false });

app.use("/admin", authenticate, isAdmin, adminRouter);
app.use("/faculty", authenticate, isAdminOrStudent, facultyRouter);
app.use("/course", authenticate, isAdminOrStudent, courseRouter);
app.use("/register", authenticate, isStudent, registerRouter);
app.use("/timetable", authenticate, isStudent, timetableRouter);
app.use("/user", userRouter);

console.log(
  "🚧 Starting ",
  process.env.NODE_ENV == "production" ? "prod" : "staging",
  " Environment"
);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database Connected!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("🚀 Server Ready! at port:", PORT);
    });
  })
  .catch((error) => console.log(error));
