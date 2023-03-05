/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dotenv from "dotenv";
dotenv.config();

import { DataSource, DataSourceOptions } from "typeorm";
import { ClashedSlot } from "../entities/ClashedSlot";
import { Course } from "../entities/Course";
import { Faculty } from "../entities/Faculty";
import { Slot } from "../entities/Slot";
import { Student } from "../entities/Student";
import { Timing } from "../entities/Timing";
import { User } from "../entities/User";
import { RegisteredCourse } from "../entities/RegisteredCourse";

interface dbConfig {
  type: string;
  host: string | undefined;
  port: number;
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  entities: any[];
  synchronize: boolean;
  ssl?: boolean;
}

const config: dbConfig = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    ClashedSlot,
    Course,
    Faculty,
    Slot,
    Student,
    Timing,
    User,
    RegisteredCourse,
  ],
  synchronize: true,
};

if (process.env.POSTGRES_SSL === "require") {
  config.ssl = true;
}

const AppDataSource = new DataSource(config as DataSourceOptions);

export default AppDataSource;
