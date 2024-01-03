import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchUserData = async () => {
  try {
    const data = await prisma.user.findMany({ orderBy: [{ id: 'asc' }] });
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
};
