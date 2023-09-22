import { Request, Response, NextFunction } from "express";
import { ApiError } from "../helpers/api-errors";

const errorMiddleware = (
  error: Error & Partial<ApiError>,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  const statusCode = error.status ?? 500;
  const message = error.status ? error.message : "Internal Server Error";

  return res.status(statusCode).json({ message });
};

export default errorMiddleware;
