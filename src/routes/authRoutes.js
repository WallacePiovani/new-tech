import { Router } from 'express';
import { controllerLoginAuth } from '../controllers/authController.js';

const router = Router();


router.post('/login', controllerLoginAuth);


export default router;