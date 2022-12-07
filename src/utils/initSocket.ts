const { createAdapter } = require('@socket.io/redis-adapter')
import { Server } from 'socket.io'
import { quizSocket } from './quizSocket'

export const sockets = {
  init(context: any) {
    const { redis } = context
    const pubClient = redis
    const subClient = pubClient.duplicate()
    const socket = new Server(context.app.server, {
      cors: {
        origin: '*'
    },
    })
    socket.adapter(createAdapter(pubClient, subClient))
    context.socket = socket

    quizSocket.init(context)

    socket.on('connection', function (socket: any) {})
    const thisContext: any = this
    thisContext.socket = socket
  },
}