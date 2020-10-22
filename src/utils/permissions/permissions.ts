import { Request, Response, NextFunction } from "express";
import { NotPermittedError } from "../errors/user";

export const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
  permission: number
): Promise<void> => {
  req.body.currentUser?.permissions?.includes(permission)
    ? next()
    : res.json(new NotPermittedError());
};
