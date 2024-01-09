import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './lib/jwt';

export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get('accessToken') as string;

  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: 'Unauthorized request' }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: 'Unauthorized request' }),
      { status: 401 }
    );
  }

  try {
    verifyJwt(token);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: 'Unauthorized request' }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ['/dashboard'],
};
