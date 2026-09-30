import bcrypt from 'bcryptjs';
import { UserRepository, type CreateUserInput } from '../repositories/userRepository.ts';

export class UserService {
  constructor(private userRepository: UserRepository = new UserRepository()) {}

  getUsers() {
    return this.userRepository.findAll();
  }

  async createUser(input: Omit<CreateUserInput, 'passwordHash'> & { password: string }) {
    const passwordHash = await bcrypt.hash(input.password, 12);
    return this.userRepository.create({
      name: input.name,
      email: input.email,
      role: input.role,
      passwordHash,
    });
  }
}