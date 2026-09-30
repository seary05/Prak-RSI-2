import type { Request, Response } from 'express';
import { AuditService } from '../services/auditService.ts';

export class AuditController {
  constructor(private auditService: AuditService = new AuditService()) {}

  getAuditLogs = async (_req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(200).json({ status: 'success', data: await this.auditService.getAuditLogs() });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Gagal mengambil audit logs', error: error instanceof Error ? error.message : String(error) });
    }
  };

  createAuditLog = async (req: Request, res: Response): Promise<Response> => {
    const { userId, action, targetTable, targetId, metadata } = req.body ?? {};
    if (![userId, targetId].every(Number.isInteger)
      || ![action, targetTable].every((value) => typeof value === 'string' && value.length > 0)) {
      return res.status(400).json({ status: 'fail', message: 'userId, action, targetTable, dan targetId wajib valid' });
    }
    try {
      const log = await this.auditService.createAuditLog({ userId, action, targetTable, targetId, metadata });
      return res.status(201).json({ status: 'success', data: log });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Gagal membuat audit log', error: error instanceof Error ? error.message : String(error) });
    }
  };
}