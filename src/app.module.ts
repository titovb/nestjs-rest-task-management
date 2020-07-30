import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        dropSchema: config.get<boolean>('DB_DROP'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule
  ]
})
export class AppModule {
}
