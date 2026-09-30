import {
  MenuItemRepository,
  type CreateMenuItemInput,
  type FindMenuItemsParams,
} from '../repositories/menuItemRepository.ts';

export class MenuItemService {
  constructor(private menuItemRepository: MenuItemRepository = new MenuItemRepository()) {}

  async getAllMenuItems(params: FindMenuItemsParams) {
    const { rows, total } = await this.menuItemRepository.findAll(params);
    return { data: rows, total };
  }

  async getMenuItemById(id: number) {
    const row = await this.menuItemRepository.findById(id);
    if (!row) throw new Error('MENU_ITEM_NOT_FOUND');
    return row;
  }

  async createMenuItem(input: CreateMenuItemInput) {
    const row = await this.menuItemRepository.create(input);
    if (!row) throw new Error('MENU_ITEM_NOT_FOUND');
    return row;
  }

  async updateMenuItem(id: number, input: Partial<CreateMenuItemInput>) {
    const row = await this.menuItemRepository.update(id, input);
    if (!row) throw new Error('MENU_ITEM_NOT_FOUND');
    return row;
  }

  async deleteMenuItem(id: number) {
    const row = await this.menuItemRepository.remove(id);
    if (!row) throw new Error('MENU_ITEM_NOT_FOUND');
    return row;
  }
}