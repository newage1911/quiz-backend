import { Quiz } from '../entities/quiz.entity'
import { Answer } from '../entities/answer.entity'
import { User } from '../entities/user.entity'
import { createConnection } from 'typeorm';

export const databaseProvider = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => 
            await createConnection({
                type: 'postgres',
                host: 'orientation-game.cjbvfnmytbzx.ap-southeast-1.rds.amazonaws.com',
                port: 5432,
                username: 'postgres',
                password: 'wZjE47ytv5gbQaK6nPT7VhrBGXmFAQZm',
                database: 'orientation-game',
                entities: [Quiz, Answer, User],
                synchronize: true,
                ssl: false
            })
        },
]