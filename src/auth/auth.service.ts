import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: { role: string }): Promise<string> {
    return this.jwtService.sign({ role: user.role });
  }
}
