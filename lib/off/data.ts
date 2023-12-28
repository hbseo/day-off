export const fetchCardData = async () => {
  try {
    const total = 15;
    const use = 5;
    const remain = 10;
    return {
      total,
      use,
      remain,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
};

export const fetchTypeData = () => {
  return [
    {
      id: 1,
      type: '연차',
    },
    {
      id: 2,
      type: '월차',
    },
    {
      id: 3,
      type: '경조',
    },
    {
      id: 4,
      type: '유급',
    },
    {
      id: 5,
      type: '무급',
    },
    {
      id: 6,
      type: '생휴',
    },
    {
      id: 7,
      type: '기타',
    },
  ];
};
