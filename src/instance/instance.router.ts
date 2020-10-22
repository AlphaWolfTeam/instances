import { InstanceController } from "./instance.controller";
import { Router, Request, Response, NextFunction } from "express";
import { wrapAsync } from "../utils/wrapper";
import { checkPermission } from "../utils/permissions/permissions";
import { config } from "../utils/permissions/permissions.config";

const InstanceRouter: Router = Router();

const permissionValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
  permissions: number
) => checkPermission(req, res, next, permissions);
const postPermissionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => permissionValidator(req, res, next, config.create);
const updatePermissionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => permissionValidator(req, res, next, config.update);
const deletePermissionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => permissionValidator(req, res, next, config.delete);
const getByIdPermissionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => permissionValidator(req, res, next, config.getById);
const getAllPermissionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => permissionValidator(req, res, next, config.getAll);

InstanceRouter.post(
  "/",
  postPermissionValidator,
  wrapAsync(InstanceController.create)
);
InstanceRouter.put(
  "/:id",
  updatePermissionValidator,
  wrapAsync(InstanceController.update)
);
InstanceRouter.delete(
  "/:id",
  deletePermissionValidator,
  wrapAsync(InstanceController.delete)
);
InstanceRouter.get(
  "/:id",
  getByIdPermissionValidator,
  wrapAsync(InstanceController.findById)
);
InstanceRouter.get(
  "/",
  getAllPermissionValidator,
  wrapAsync(InstanceController.find)
);

export { InstanceRouter };
