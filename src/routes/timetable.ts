/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router, Request, Response } from "express";
import ApiResponse from "../core/ApiResponse";
import TimetableController from "../controllers/timetable.controller";

const timetableRouter = Router();
const { getTimetable } = new TimetableController();
const { successResponse, badRequestResponse } = new ApiResponse();

timetableRouter.post("/", async (req: Request, res: Response) => {
  try {
    successResponse(res, await getTimetable(req.user));
  } catch (error: any) {
    badRequestResponse(res, error.message);
  }
});

export default timetableRouter;
