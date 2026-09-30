import type { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';

export class UserController {
  constructor(private userService: UserService = new UserService()) {}

  getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(200).json({ status: 'success', data: await this.userService.getUsers() });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Gagal mengambil users', error: error instanceof Error ? error.message : String(error) });
    }
  };

  createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, role } = req.body ?? {};
    if (![name, email, password, role].every((value) => typeof value === 'string' && value.length > 0)
      || !['admin', 'owner', 'customer'].includes(role)) {
      return res.status(400).json({ status: 'fail', message: 'name, email, password, dan role yang valid wajib diisi' });
    }
    try {
      const user = await this.userService.createUser({ name, email, password, role });
      return res.status(201).json({ status: 'success', data: user });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Gagal membuat user', error: error instanceof Error ? error.message : String(error) });
    }
  };
}