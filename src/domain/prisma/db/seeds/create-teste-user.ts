import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function createTesteUser(prisma: PrismaClient) {
    const existingUser = await prisma.user.findFirst({
        where: { email: 'admin@exemplo.com' },
    });

    if (!existingUser) {
        const password = await bcrypt.hash('1234', 10);
        await prisma.user.create({
            data: {
                name: 'Usuário teste',
                email: 'teste@teste.com.br',
                password,
            },
        });
    }
}
