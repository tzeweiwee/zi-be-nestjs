import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Generate JWT token as an admin',
    description:
      'For development purposes, this returns a JWT token for admin usage.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully obtained token',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login() {
    // You would typically validate the user's credentials here
    const user = { role: 'admin' };

    const token = await this.authService.generateToken(user);
    return { access_token: token };
  }
}
