import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

type RequestBody = {
  name: string;
  password: string;
  email: string;
};

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      password: await bcrypt.hash(body.password, 10),
      email: body.email,
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
