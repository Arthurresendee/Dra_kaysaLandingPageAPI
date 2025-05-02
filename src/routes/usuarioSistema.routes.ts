import { Router } from 'express';
import UsuarioSistemaController from '../controllers/UsuarioSistemaController';

const router = Router();

router.get('/', UsuarioSistemaController.getAll);
router.get('/:id', UsuarioSistemaController.getById);
router.post('/', UsuarioSistemaController.create);
router.put('/:id', UsuarioSistemaController.update);
router.delete('/:id', UsuarioSistemaController.delete);

// Rota de login
router.post('/login', UsuarioSistemaController.login);

export default router; 