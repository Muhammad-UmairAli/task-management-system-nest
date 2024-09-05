import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body, @Res() response) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password); // Validate the user manually
    if (!user) {
      response.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    return this.authService.login(user);
  }
}
