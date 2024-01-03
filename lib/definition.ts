export type User = {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'MANAGER' | 'ADMIN';
};

export type OffType = {
  id: number;
  type: string;
};
