import { Provider } from '@nestjs/common'
import { Connection } from 'typeorm/connection/Connection'
import { Answer } from '../entities/answer.entity'

export const answerProvider: Provider[] = [
    {
        provide: 'ANSWER_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(Answer),
        inject: ['DATABASE_CONNECTION'],  
    },
]