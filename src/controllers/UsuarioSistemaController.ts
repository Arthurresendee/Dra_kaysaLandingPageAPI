import { Request, Response } from 'express';
import UsuarioSistema from '../models/UsuarioSistema';

class UsuarioSistemaController {
  static async getAll(req: Request, res: Response) {
    try {
      const usuarios = await UsuarioSistema.find().select('-senha');
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const usuario = await UsuarioSistema.findById(req.params.id).select('-senha');
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário', error });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { user } = req.body;
      
      // Verifica se já existe um usuário com este username
      const existingUser = await UsuarioSistema.findOne({ user });
      if (existingUser) {
        return res.status(400).json({ message: 'Nome de usuário já cadastrado' });
      }

      const usuario = new UsuarioSistema(req.body);
      await usuario.save();
      
      const { senha, ...usuarioSemSenha } = usuario.toObject();
      
      res.status(201).json(usuarioSemSenha);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar usuário', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { user } = req.body;
      
      // Se o username foi alterado, verifica se já existe
      if (user) {
        const existingUser = await UsuarioSistema.findOne({ 
          user, 
          _id: { $ne: req.params.id } 
        });
        if (existingUser) {
          return res.status(400).json({ message: 'Nome de usuário já cadastrado' });
        }
      }

      const usuario = await UsuarioSistema.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
      ).select('-senha');

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao atualizar usuário', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const usuario = await UsuarioSistema.findByIdAndDelete(req.params.id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
  }

  // Rota específica para login (sem autenticação por enquanto)
  static async login(req: Request, res: Response) {
    try {
      const { user, senha } = req.body;

      const usuario = await UsuarioSistema.findOne({ user, senha });
      if (!usuario) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }

      const { senha: _, ...usuarioSemSenha } = usuario.toObject();

      res.json(usuarioSemSenha);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao realizar login', error });
    }
  }
}

export default UsuarioSistemaController; 