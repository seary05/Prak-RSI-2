import { FlagRepository, type FlagStatus } from '../repositories/flagRepository.ts';

export class FlagService {
  constructor(private flagRepository: FlagRepository = new FlagRepository()) {}

  getFlags() {
    return this.flagRepository.findAll();
  }

  async updateStatus(id: number, status: FlagStatus) {
    const row = await this.flagRepository.updateStatus(id, status);
    if (!row) throw new Error('FLAG_NOT_FOUND');
    return row;
  }
}