import { Router } from 'express';
import { AuditController } from '../controllers/auditController.ts';

const auditRouter = Router();
const controller = new AuditController();

auditRouter.get('/', (req, res) => controller.getAuditLogs(req, res));
auditRouter.post('/', (req, res) => controller.createAuditLog(req, res));

export { auditRouter };