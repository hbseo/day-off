'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { offFormSchema } from '@/components/off/create-form';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function createOff(data: z.infer<typeof offFormSchema>) {
  const dateList = data.date.map((d) => ({
    date: d.date,
    type: d.type,
  }));

  try {
    await prisma.off.create({
      data: {
        fromUserId: data.fromUser,
        toUserId: data.toUser,
        reason: data.reason,
        type: data.type,
        date: {
          create: dateList,
        },
      },
    });
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath('/off');
  redirect('/off');
}
