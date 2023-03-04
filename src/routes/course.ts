/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router, Request, Response } from "express";
import CourseController from "../controllers/course.controller";
import ApiResponse from "../core/ApiResponse";
import schemas from "../middleware/schema";
import { paramValidator } from "../middleware/validation";

const courseRouter = Router();
const { getCourse } = new CourseController();
const { successResponse, notFoundResponse } = new ApiResponse();

courseRouter.get(
  "/:course_id",
  paramValidator(schemas.getCourse),
  async (req: Request, res: Response) => {
    try {
      const id = req.params.course_id;
      successResponse(res, await getCourse(id));
    } catch (error: any) {
      notFoundResponse(res, error.message);
    }
  }
);

export default courseRouter;
