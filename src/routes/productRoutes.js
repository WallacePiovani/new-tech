import { Router } from 'express'
import { getProduct } from '../controllers/productController.js'
import { autenticadorMiddleware } from '../middlewares/ntMiddleware.js'

const router = Router();

router.get('/produtos', autenticadorMiddleware, getProduct);

export default router