import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UsuarioSistema from '../models/UsuarioSistema';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_padrao';

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { user, senha } = req.body;
      console.log('Tentativa de login para usuário:', user);

      const usuario = await UsuarioSistema.findOne({ user });
      if (!usuario) {
        console.log('Usuário não encontrado');
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }

      console.log('Usuário encontrado, verificando senha');
      // Verifica a senha
      const senhaCorreta = await usuario.verificarSenha(senha);
      console.log('Senha está correta?', senhaCorreta);
      
      if (!senhaCorreta) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }

      // Gera o token JWT
      const token = jwt.sign({ id: usuario._id }, JWT_SECRET, {
        expiresIn: '24h'
      });

      const { senha: _, ...usuarioSemSenha } = usuario.toObject();

      console.log('Login realizado com sucesso');
      res.json({ 
        usuario: usuarioSemSenha, 
        token,
        message: 'Login realizado com sucesso'
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ message: 'Erro ao realizar login', error });
    }
  }
}

export default AuthController; 