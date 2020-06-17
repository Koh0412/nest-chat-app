import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "src/server/domains/users/users.module";
import { AuthModule } from "../auth/auth.module";
import { BroadcastGateway } from "src/server/handlers/gateways/broadcast.gateway";

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, BroadcastGateway],
})
export class AppModule {}
