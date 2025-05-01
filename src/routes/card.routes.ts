import { Router } from 'express';
import CardController from '../controllers/CardController';

const router = Router();

router.get('/', CardController.getAll);
router.get('/:id', CardController.getById);
router.post('/', CardController.create);
router.put('/:id', CardController.update);
router.delete('/:id', CardController.delete);

export default router; 