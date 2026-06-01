import { Router } from 'express'
import { getProduct, createProduct, deleteProduct, getProductById,updateProduct } from '../controllers/productController.js'
import { autenticadorMiddleware } from '../middlewares/ntMiddleware.js'
import { upload } from '../config/uploadConfig.js';

const router = Router();

router.get('/produtos', autenticadorMiddleware, getProduct);
router.post('/produtos', autenticadorMiddleware, upload.single('imagem'), createProduct);
router.delete('/produtos/:id', autenticadorMiddleware, deleteProduct);
router.get('/produtos/:id', autenticadorMiddleware, getProductById);
router.put('/produtos/:id', autenticadorMiddleware, updateProduct);

export default router