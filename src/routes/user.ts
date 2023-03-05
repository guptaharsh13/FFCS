/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router, Request, Response } from "express";
import ApiResponse from "../core/ApiResponse";
import schemas from "../middleware/schema";
import { bodyValidator } from "../middleware/validation";
import UserController from "../controllers/user.controller";

const userRouter = Router();
const { register, login } = new UserController();
const { successResponse, badRequestResponse, authFaliureResponse } =
  new ApiResponse();

userRouter.post(
  "/register",
  bodyValidator(schemas.register),
  async (req: Request, res: Response) => {
    try {
      successResponse(res, await register(req.body));
    } catch (error: any) {
      badRequestResponse(res, error.message);
    }
  }
);

userRouter.post(
  "/login",
  bodyValidator(schemas.login),
  async (req: Request, res: Response) => {
    try {
      successResponse(res, await login(req.body));
    } catch (error: any) {
      authFaliureResponse(res, error.message);
    }
  }
);

export default userRouter;
