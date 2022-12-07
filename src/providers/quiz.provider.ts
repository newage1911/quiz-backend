import { Provider } from '@nestjs/common'
import { Connection } from 'typeorm/connection/Connection'
import { Quiz } from '../entities/quiz.entity'

export const quizProvider: Provider[] = [
    {
        provide: 'QUIZ_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(Quiz),
        inject: ['DATABASE_CONNECTION'],  
    },
]