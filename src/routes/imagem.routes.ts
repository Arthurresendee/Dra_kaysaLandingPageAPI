import { Router } from 'express';
import ImagemController from '../controllers/ImagemController';

const router = Router();

router.get('/', ImagemController.getAll);
router.get('/:id', ImagemController.getById);
router.post('/', ImagemController.create);
router.put('/:id', ImagemController.update);
router.delete('/:id', ImagemController.delete);

export default router; 