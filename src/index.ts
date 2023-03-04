import * as dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";

import cors from "cors";
import morgan from "morgan";

import { DataSource } from "typeorm";
import { ClashedSlot } from "./entities/ClashedSlot";
import { Course } from "./entities/Course";
import { Faculty } from "./entities/Faculty";
import { Slot } from "./entities/Slot";
import { Student } from "./entities/Student";
import { Timing } from "./entities/Timing";

import adminRouter from "./routes/admin";
import facultyRouter from "./routes/faculty";
import courseRouter from "./routes/course";

const app: Express = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.use(morgan(process.env.NODE_ENV == "production" ? "common" : "dev"));
app.use(express.json());

app.use(cors());

app.use("/admin", adminRouter);
app.use("/faculty", facultyRouter);
app.use("/course", courseRouter);

console.log(
  "🚧 Starting ",
  process.env.NODE_ENV == "production" ? "prod" : "staging",
  " Environment"
);

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [ClashedSlot, Course, Faculty, Slot, Student, Timing],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database Connected!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("🚀 Server Ready! at port:", PORT);
    });
  })
  .catch((error) => console.log(error));
