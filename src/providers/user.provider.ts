import { Provider } from '@nestjs/common'
import { Connection } from 'typeorm/connection/Connection'
import { User } from '../entities/user.entity'

export const userProvider: Provider[] = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(User),
        inject: ['DATABASE_CONNECTION'],  
    },
]