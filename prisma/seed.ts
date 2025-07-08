import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient(); 

async function main() {

    const hashedPassword = await bcrypt.hash('Ad12345678@', 10); 

    const adminUser = await prisma.users.upsert({
        where: { email: 'admin@gmail.com' }, 
        update: { 
        senha: hashedPassword,
        isAdmin: true,
        nome: 'Administrador', 
    },
    create: { 
        email: 'admin@gmail.com',
        senha: hashedPassword,
        nome: 'Administrador',
        isAdmin: true, 
        departamento: 'Segurança', 
      curso: 'Administração'
        },
    });

}

main()
  .catch((e) => {
    console.error(e); 
    process.exit(1); 
  })
  .finally(async () => {
    await prisma.$disconnect(); 
});