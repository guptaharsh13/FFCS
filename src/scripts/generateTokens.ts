/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const PORT = Number(process.env.PORT) || 3000;
const baseURL = `http://localhost:${PORT}`;

const server = axios.create({
  baseURL,
});

let ADMIN_AUTH_TOKEN = "";
let STUDENT_AUTH_TOKEN = "";

// register admin
const registerAdmin = async () => {
  try {
    const response = await server.post("/user/register", {
      registration_number: "admin",
      password: "admin",
      role: "admin",
    });
    console.log(`\nPOST /user/register ${response.status}`);
    console.log("Admin user registered successfully\n");
  } catch (error: any) {
    console.log(error.message);
  }
};

// login admin
const loginAdmin = async () => {
  try {
    const response = await server.post("/user/login", {
      registration_number: "admin",
      password: "admin",
    });
    console.log(`\nPOST /user/login ${response.status}`);
    if (response.status === 200 && response.data.success) {
      ADMIN_AUTH_TOKEN = response.data.data.token;
      console.log("Admin token generated successfully\n");
      return;
    }
    throw new Error("Could not generate admin token");
  } catch (error: any) {
    console.log(error.message);
  }
};

// create student
const createStudent = async () => {
  try {
    const response = await server.post(
      "/admin/student",
      {
        id: "20BCI0334",
        name: "Harsh Gupta",
      },
      {
        headers: {
          Authorization: ADMIN_AUTH_TOKEN,
        },
      }
    );
    console.log(`\nPOST /admin/student ${response.status}`);
    console.log("Student created successfully\n");
  } catch (error: any) {
    console.log(error.message);
  }
};

// register student
const registerStudent = async () => {
  try {
    const response = await server.post("/user/register", {
      registration_number: "20BCI0334",
      password: "harsh123",
      role: "student",
    });
    console.log(`\nPOST /user/register ${response.status}`);
    console.log("Student user registered successfully\n");
  } catch (error: any) {
    console.log(error.message);
  }
};

// login student
const loginStudent = async () => {
  try {
    const response = await server.post("/user/login", {
      registration_number: "20BCI0334",
      password: "harsh123",
    });
    console.log(`\nPOST /user/login ${response.status}`);

    if (response.status === 200 && response.data.success) {
      STUDENT_AUTH_TOKEN = response.data.data.token;
      console.log("Student token generated successfully\n");
      return;
    }
    throw new Error("Could not generate admin token");
  } catch (error: any) {
    console.log(error.message);
  }
};

const main = async () => {
  await registerAdmin();
  await loginAdmin();
  await createStudent();
  await registerStudent();
  await loginStudent();

  console.log(`STUDENT_AUTH_TOKEN = ${STUDENT_AUTH_TOKEN}`);
  console.log(`\n\nADMIN_AUTH_TOKEN = ${ADMIN_AUTH_TOKEN}`);
};

main();
