import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService} from '@nestjs/config';

@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.registerAsync({
      useFactory: async(configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
