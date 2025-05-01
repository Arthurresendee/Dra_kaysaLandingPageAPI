import { Router } from 'express';
import TopicoController from '../controllers/TopicoController';

const router = Router();

router.get('/', TopicoController.getAll);
router.get('/:id', TopicoController.getById);
router.post('/', TopicoController.create);
router.put('/:id', TopicoController.update);
router.delete('/:id', TopicoController.delete);

export default router; 