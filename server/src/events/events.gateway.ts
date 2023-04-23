import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class EventsGateway {
  @SubscribeMessage('events')
  handleEvent(@MessageBody('id') id: number): number {
    // id === messageBody.id
    console.log('id', id);
    return id;
  }

  userSocketMap = {};

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody('roomID') roomID: string,
    @MessageBody('username') username: string,
    @ConnectedSocket() client: Socket,
    @ConnectedSocket() server: Server,
  ): string {
    client.join(roomID);

    // @ts-ignore
    const joinedUsers = Array.from(server.adapter.rooms.get(roomID) || []).map(
      (socketId: any) => {
        return {
          socketId,
          username: this.userSocketMap[socketId],
        };
      },
    );

    this.userSocketMap[client.id] = username;

    joinedUsers.forEach(({ socketId }) => {
      server.to(socketId).emit('joined', {
        joinedUsers,
        username,
        socketId: client.id,
      });
    });

    console.log('joinedUsers', joinedUsers);

    return roomID;
  }

  @SubscribeMessage('joined')
  handleJoined(@MessageBody('id') id: number): number {
    // id === messageBody.id
    console.log('id', id);
    return id;
  }

  @SubscribeMessage('disconnected')
  handleDisconnected(@MessageBody('id') id: number): number {
    // id === messageBody.id
    console.log('id', id);
    return id;
  }

  @SubscribeMessage('code-changed')
  handleCodeChanged(@MessageBody('id') id: number): number {
    // id === messageBody.id
    console.log('id', id);
    return id;
  }

  @SubscribeMessage('sync-code')
  handleSyncCode(@MessageBody('id') id: number): number {
    // id === messageBody.id
    console.log('id', id);
    return id;
  }

  @SubscribeMessage('leave')
  handleLeave(@MessageBody('id') id: number): number {
    // id === messageBody.id
    console.log('id', id);
    return id;
  }
}
