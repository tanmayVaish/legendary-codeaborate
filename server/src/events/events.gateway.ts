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
    @MessageBody('name') name: string,
    @MessageBody('image') image: string,
    @ConnectedSocket() socket: Socket,
    @ConnectedSocket() server: Server,
  ): string {
    socket.join(roomID);
    this.userSocketMap[socket.id] = {
      name,
      image,
    };

    // @ts-ignore
    const joinedUsers = Array.from(server.adapter.rooms.get(roomID) || []).map(
      (socketId: any) => {
        return {
          socketId,
          name: this.userSocketMap[socketId].name,
          image: this.userSocketMap[socketId].image,
        };
      },
    );

    // notify each users in the room about the new user
    joinedUsers.forEach(({ socketId }) => {
      server.to(socketId).emit('joined', {
        joinedUsers,
        name: this.userSocketMap[socket.id].name,
        image: this.userSocketMap[socket.id].image,
        socketId: socket.id,
      });
    });

    console.log('joinedUsers', joinedUsers);

    return roomID;
  }
}
