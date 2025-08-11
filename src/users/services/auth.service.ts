import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { JwtPayload } from '../repositories/interfaces/jwt-payload.interface';
import { User } from '../entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.userService.findOneByEmail(payload.email);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
