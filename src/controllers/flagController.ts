import type { Request, Response } from 'express';
import { FlagService } from '../services/flagService.ts';
import type { FlagStatus } from '../repositories/flagRepository.ts';

const flagStatuses: FlagStatus[] = ['pending', 'resolved', 'dismissed'];

export class FlagController {
  constructor(private flagService: FlagService = new FlagService()) {}

  getFlags = async (_req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(200).json({ status: 'success', data: await this.flagService.getFlags() });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Gagal mengambil flags', error: error instanceof Error ? error.message : String(error) });
    }
  };

  updateStatus = async (req: Request, res: Response): Promise<Response> => {
    const { status } = req.body ?? {};
    if (!flagStatuses.includes(status)) return res.status(400).json({ status: 'fail', message: 'status harus pending, resolved, atau dismissed' });
    try {
      return res.status(200).json({ status: 'success', data: await this.flagService.updateStatus(Number(req.params.id), status) });
    } catch (error) {
      if (error instanceof Error && error.message === 'FLAG_NOT_FOUND') return res.status(404).json({ status: 'fail', message: 'Flag tidak ditemukan' });
      return res.status(500).json({ status: 'error', message: 'Gagal memperbarui flag', error: error instanceof Error ? error.message : String(error) });
    }
  };
}