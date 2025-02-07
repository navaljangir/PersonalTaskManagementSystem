import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export const config = {
    matcher: ['/tasks', '/projects'],
};

export default withAuth(async (req) => {
    const token = req.nextauth.token;

    if (!token) {
        return NextResponse.next();
    }
    const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?token=${token.jwtToken}`
    );
    const userExists = await userResponse.json();
    if (!userExists.user) {
        return NextResponse.redirect(new URL('/invalidsession', req.url));
    }

    return NextResponse.next();
});
