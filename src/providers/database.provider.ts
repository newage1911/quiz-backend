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
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '1234',
                database: 'postgres',
                entities: [Quiz, Answer, User],
                synchronize: true,
                ssl: false
            })
        },
]