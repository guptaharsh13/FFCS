import { Response } from "express";

class ApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successResponse = (res: Response, data: any) => {
    return res.json({ success: true, data });
  };

  badRequestResponse = (res: Response, message: string) => {
    return res
      .status(400)
      .json({ success: false, error: { code: 400, message } });
  };

  authFaliureResponse = (res: Response, message: string) => {
    return res
      .status(401)
      .json({ success: false, error: { code: 401, message } });
  };

  forbiddenResponse = (res: Response, message: string) => {
    return res
      .status(403)
      .json({ success: false, error: { code: 403, message } });
  };

  notFoundResponse = (res: Response, message: string) => {
    return res
      .status(404)
      .json({ success: false, error: { code: 404, message } });
  };

  internalErrorResponse = (res: Response, message: string) => {
    return res
      .status(500)
      .json({ success: false, error: { code: 500, message } });
  };

  unprocessableEntryResponse = (res: Response, message: string) => {
    return res
      .status(422)
      .json({ success: false, error: { code: 422, message } });
  };
}

export default ApiResponse;
