import { db } from "@/db/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const body = await req.json()
    const projectId = body.projectId
    try {
        await db.delete(projects).where(eq(projects.id, projectId)).returning({
            id: projects.id
        })
        return NextResponse.json({ message: 'Delete Successfully' })
    } catch (e) {
        console.log('Error while Deleting Projects', e)
        NextResponse.json({
            message: 'Cannot Delete'
        })
    }
}