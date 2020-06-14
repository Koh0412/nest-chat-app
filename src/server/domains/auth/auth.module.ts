import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { SECRET_KEY, StrategyName } from 'src/server/common/constants/const';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: "30m" }
    }),
    PassportModule.register({ defaultStrategy: StrategyName.JWT })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
