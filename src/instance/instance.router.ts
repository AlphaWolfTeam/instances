import { InstanceController } from './instance.controller';
import { Router } from 'express';
import { wrapAsync } from '../utils/wrapper';

const InstanceRouter: Router = Router();

InstanceRouter.post('/', wrapAsync(InstanceController.create));
InstanceRouter.put('/:id', wrapAsync(InstanceController.update));
InstanceRouter.delete('/:id', wrapAsync(InstanceController.delete));
InstanceRouter.get('/:id', wrapAsync(InstanceController.findById));
InstanceRouter.get('/', wrapAsync(InstanceController.find));

export { InstanceRouter };
