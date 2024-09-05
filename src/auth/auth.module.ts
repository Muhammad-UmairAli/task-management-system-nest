// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule, // Add UsersModule to imports array
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService], // Export AuthService if needed in other modules
  controllers: [AuthController],
})
export class AuthModule {}
