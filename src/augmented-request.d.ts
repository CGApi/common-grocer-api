import { Consumer, ConsumerPermissions } from '@prisma/client';


declare global {
    namespace Express {
        interface Request {
            consumer: Consumer & { permissions: ConsumerPermissions; }
        }
    }
}
