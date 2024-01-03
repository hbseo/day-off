const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const randomEmail = [
  'gkcfwtnm21@outlook.com',
  'zgkxazpj2@gmail.com',
  'abzyjtrq5@mail.com',
  'vyuygshh3@outlook.com',
  'nuhphnqq55@yahoo.com',
  'mgegacam29@outlook.com',
  'kppkrwim71@outlook.com',
  'hhmfbhdp22@mail.com',
  'rqduhuop23@gmail.com',
  'hygjgosb89@mail.com',
];

const randomName = [
  'Moshe',
  'Vazquez',
  'Julia',
  'Patrick',
  'Lanny',
  'Zuniga',
  'Gregory',
  'Frey',
  'Grady',
  'Key',
];

async function createUsers() {
  Promise.all(
    Array.from({ length: 10 }, (_, index) => {
      return prisma.user.create({
        data: {
          email: randomEmail[index],
          name: randomName[index],
        },
      });
    })
  );
}

createUsers().finally(async () => {
  await prisma.$disconnect();
});
