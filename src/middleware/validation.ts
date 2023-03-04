/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import ApiResponse from "../core/ApiResponse";

const { unprocessableEntryResponse } = new ApiResponse();

const bodyValidator =
  (schema: any) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error == null) {
      next();
    } else {
      const { details } = error;
      const errorMessages = details
        .map((i: Record<string, unknown>) => i.message)
        .join(",");

      unprocessableEntryResponse(res, errorMessages);
    }
  };

const paramValidator =
  (paramSchema: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error } = paramSchema.validate(req.params);
    if (error == null) {
      next();
    } else {
      const { details } = error;
      const errorMessages = details
        .map((i: Record<string, unknown>) => i.message)
        .join(",");

      unprocessableEntryResponse(res, errorMessages);
    }
  };

export { bodyValidator, paramValidator };
