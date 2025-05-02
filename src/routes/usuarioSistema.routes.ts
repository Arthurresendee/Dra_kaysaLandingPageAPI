import { Router } from 'express';
import UsuarioSistemaController from '../controllers/UsuarioSistemaController';
import { auth } from '../middleware/auth';

const router = Router();

// Rota pública (não precisa de token)
router.post('/', UsuarioSistemaController.create);

// Rotas protegidas (precisam de token)
router.get('/', auth, UsuarioSistemaController.getAll);
router.get('/:id', auth, UsuarioSistemaController.getById);
router.put('/:id', auth, UsuarioSistemaController.update);
router.delete('/:id', auth, UsuarioSistemaController.delete);

export default router; 