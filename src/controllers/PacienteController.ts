import { Request, Response } from 'express';
import Paciente from '../models/Paciente';

class PacienteController {
  static async getAll(req: Request, res: Response) {
    try {
      const pacientes = await Paciente.find();
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pacientes', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const paciente = await Paciente.findById(req.params.id);
      if (!paciente) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.json(paciente);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar paciente', error });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const paciente = new Paciente(req.body);
      await paciente.save();
      res.status(201).json(paciente);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar paciente', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const paciente = await Paciente.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (!paciente) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      res.json(paciente);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao atualizar paciente', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const paciente = await Paciente.findByIdAndDelete(req.params.id);
      if (!paciente) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      res.json({ message: 'Paciente deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar paciente', error });
    }
  }
}

export default PacienteController; 