import { Router } from 'express';
import { InstanceRouter } from './instance/instance.router';

const AppRouter: Router = Router();

AppRouter.use('/instance', InstanceRouter);

export { AppRouter };
