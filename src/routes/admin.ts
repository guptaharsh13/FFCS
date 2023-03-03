/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router, Request, Response } from "express";
import AdminController from "../controllers/admin.controller";
import ApiResponse from "../core/ApiResponse";
import schemas from "../middleware/schema";
import bodyValidator from "../middleware/validation";

const adminRouter = Router();
const { createFaculty, createCourse, createStudent } = new AdminController();
const { successResponse, badRequestResponse } = new ApiResponse();

adminRouter.post(
  "/faculty",
  bodyValidator(schemas.createFaculty),
  async (req: Request, res: Response) => {
    try {
      successResponse(res, await createFaculty(req.body));
    } catch (error: any) {
      badRequestResponse(res, error.message);
    }
  }
);

adminRouter.post(
  "/course",
  bodyValidator(schemas.createCourse),
  async (req: Request, res: Response) => {
    try {
      successResponse(res, await createCourse(req.body));
    } catch (error: any) {
      badRequestResponse(res, error.message);
    }
  }
);

adminRouter.post(
  "/student",
  bodyValidator(schemas.createStudent),
  async (req: Request, res: Response) => {
    try {
      successResponse(res, await createStudent(req.body));
    } catch (error: any) {
      badRequestResponse(res, error.message);
    }
  }
);

export default adminRouter;
