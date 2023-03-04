/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router, Request, Response } from "express";
import FacultyController from "../controllers/faculty.controller";
import ApiResponse from "../core/ApiResponse";
import schemas from "../middleware/schema";
import { paramValidator } from "../middleware/validation";

const facultyRouter = Router();
const { getFaculty } = new FacultyController();
const { successResponse, notFoundResponse } = new ApiResponse();

facultyRouter.get(
  "/:faculty_id",
  paramValidator(schemas.getFaculty),
  async (req: Request, res: Response) => {
    try {
      const id = req.params.faculty_id;
      successResponse(res, await getFaculty(id));
    } catch (error: any) {
      notFoundResponse(res, error.message);
    }
  }
);

export default facultyRouter;
