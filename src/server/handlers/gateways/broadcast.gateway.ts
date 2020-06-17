import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Server } from "socket.io";

@WebSocketGateway(80)
export class BroadcastGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("broadcast")
  broadcast(@MessageBody() data: string): void {
    this.server.emit("broadcast", data)
  }
}
