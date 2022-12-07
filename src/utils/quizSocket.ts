import { quizService } from "src/quiz/quiz.service"

export const quizSocket = {
  socket: undefined,
  init({ socket }: { socket: any }) {
    this.socket = socket.of('quiz-socket')
    const thisSocket = this.socket as any
    thisSocket?.on('connection', async () => {
      const data: any[] = await (quizService as any).getScoreBoard()
      thisSocket?.emit('init', data)
    })
  },
} as any