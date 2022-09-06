import { createServer, Socket, Server, SocketConstructorOpts, ServerOpts } from 'net';

export class Peer {
    connections: Socket[] = []

    server: Server
    client: Socket

    constructor(serverPort: number = 3000, serverOpts?: ServerOpts, clientOpts?: SocketConstructorOpts) {
        this.server = createServer(serverOpts, this.onSocketConnected)
        this.server.listen(serverPort, () => console.log(`Listen on port ${serverPort}`))

        this.client = new Socket(clientOpts)
    }

    private onSocketConnected(socket: Socket) {
        this.connections.push(socket)
    }

    broadcast(data: any) {
        this.connections.forEach(socket => socket.write(data))
    }
}
