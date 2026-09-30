import { Router } from 'express';
import { MenuItemController } from '../controllers/menuItemController.ts';

const menuItemRouter = Router();
const controller = new MenuItemController();

menuItemRouter.get('/', (req, res) => controller.getMenuItems(req, res));
menuItemRouter.post('/', (req, res) => controller.createMenuItem(req, res));
menuItemRouter.get('/:id', (req, res) => controller.getMenuItemById(req, res));
menuItemRouter.put('/:id', (req, res) => controller.updateMenuItem(req, res));
menuItemRouter.delete('/:id', (req, res) => controller.deleteMenuItem(req, res));

export { menuItemRouter };