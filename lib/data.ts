import prisma from './prisma';

export const fetchUserData = async () => {
  try {
    const data = await prisma.user.findMany({ orderBy: [{ id: 'asc' }] });
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
};
