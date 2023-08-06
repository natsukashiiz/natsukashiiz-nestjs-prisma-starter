import { OnModuleInit, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@WebSocketGateway()
export class EventGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id + ':connected');
    });
  }

  //   @UseGuards(JwtAuthGuard)
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    this.server.emit('subscribe', {
      title: 'subscribe',
      content: data,
    });
    const event = 'events';
    return { event, data };
  }
}
