import { NotPermittedError } from "./errors/user";
import express from 'express';

export function authorizationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    next();
}