import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy';
import {UserModule} from '../user/user.module';
import {AuthController} from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_SECRET'),
        signOptions: {expiresIn: config.get<string>('ACCESS_EXPIRES_IN')}
      }),
      inject: [ConfigService]
    }),
    UserModule
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {
}
