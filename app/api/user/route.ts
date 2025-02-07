import { type NextRequest, NextResponse } from 'next/server';
import {db} from '@/db/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  console.log('token from the exists' , token)
  if (!token) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }
  try{
      const user = await db.query.users.findFirst({
        where: eq(users.token , token),
      });
      return NextResponse.json({
        user:user,
      });
  }catch(e){
    console.log('User Not exists' , e)
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }
}