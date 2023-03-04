import { Request, Response, NextFunction } from "express";
import { Role, User } from "../entities/User";
import ApiResponse from "../core/ApiResponse";

const { authFaliureResponse, forbiddenResponse } = new ApiResponse();

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const role = (req.user as User).role;
    if (role === Role.ADMIN) {
      next();
    }
    forbiddenResponse(res, "Forbidden");
  } catch {
    authFaliureResponse(res, "Unauthorized");
  }
};

const isStudent = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const role = (req.user as User).role;
    if (role === Role.STUDENT) {
      next();
    }
    forbiddenResponse(res, "Forbidden");
  } catch {
    authFaliureResponse(res, "Unauthorized");
  }
};

const isAdminOrStudent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const role = (req.user as User).role;
    if (role === Role.ADMIN || role === Role.STUDENT) {
      next();
    }
    forbiddenResponse(res, "Forbidden");
  } catch {
    authFaliureResponse(res, "Unauthorized");
  }
};

export { isAdmin, isStudent, isAdminOrStudent };
