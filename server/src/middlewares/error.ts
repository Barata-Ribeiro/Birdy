import { Request, Response, NextFunction } from "express";
import ApiError from "src/helpers/api-errors";

const errorMiddleware = (
  error: Error & Partial<ApiError>,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.status ?? 500;
  const message = error.status ? error.message : "Internal Server Error";

  return res.status(statusCode).json({ message });
};

export default errorMiddleware;
