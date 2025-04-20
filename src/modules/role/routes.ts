import { Router } from 'express';
import { getRoleByIdController } from './controllers/get-role-by-id.controller';
import { ro } from '@faker-js/faker/.';


const roleRouter = Router();


roleRouter.get('/:id', getRoleByIdController);

export default roleRouter;