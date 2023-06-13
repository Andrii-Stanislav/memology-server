import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class CommonGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  connectedUsers: string[] = [];

  constructor(private jwtService: JwtService) {}

  async handleDisconnect(socket: Socket) {
    console.log('handleDisconnect: ', socket);
    //
  }
}
