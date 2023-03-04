/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router, Request, Response } from "express";
import ApiResponse from "../core/ApiResponse";
import schemas from "../middleware/schema";
import { bodyValidator } from "../middleware/validation";
import RegisterController from "../controllers/register.controller";

const registerRouter = Router();
const { registerCourse } = new RegisterController();
const { successResponse, badRequestResponse } = new ApiResponse();

registerRouter.post(
  "/",
  bodyValidator(schemas.register),
  async (req: Request, res: Response) => {
    try {
      successResponse(res, await registerCourse(req.body, req.user));
    } catch (error: any) {
      badRequestResponse(res, error.message);
    }
  }
);

export default registerRouter;
