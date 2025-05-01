import { Request, Response } from 'express';
import Paciente from '../models/Paciente';

class PacienteController {
  async getAll(req: Request, res: Response) {
    try {
      const pacientes = await Paciente.find().populate('endereco procedimentos planos');
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pacientes', error });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const paciente = await Paciente.findById(req.params.id).populate('endereco procedimentos planos');
      if (!paciente) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      res.json(paciente);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar paciente', error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const paciente = new Paciente(req.body);
      await paciente.save();
      res.status(201).json(paciente);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar paciente', error });
    }
  }

  async update(req: Request, res: Response) {
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

  async delete(req: Request, res: Response) {
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

export default new PacienteController(); 