export const fetchUserData = async () => {
  try {
    const users: {
      id: number;
      name: string;
    }[] = [
      {
        id: 1,
        name: 'John',
      },
      {
        id: 2,
        name: 'Lee',
      },
      {
        id: 3,
        name: 'James',
      },
      {
        id: 4,
        name: 'Smith',
      },
      {
        id: 5,
        name: 'Park',
      },
      {
        id: 6,
        name: 'Kim',
      },
      {
        id: 7,
        name: 'Joe',
      },
    ];
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
};
