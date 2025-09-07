import { PrismaClient } from '@prisma/client';
import { createTesteUser } from './seeds/create-teste-user';

const prisma = new PrismaClient();

Promise.all([createTesteUser(prisma)]).finally(() => prisma.$disconnect());
