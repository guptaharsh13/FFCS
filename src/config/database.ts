import * as dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import { ClashedSlot } from "../entities/ClashedSlot";
import { Course } from "../entities/Course";
import { Faculty } from "../entities/Faculty";
import { Slot } from "../entities/Slot";
import { Student } from "../entities/Student";
import { Timing } from "../entities/Timing";
import { User } from "../entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [ClashedSlot, Course, Faculty, Slot, Student, Timing, User],
  synchronize: true,
});

export default AppDataSource;
