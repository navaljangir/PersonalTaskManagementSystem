'use server'

import { db } from "@/db/db"
import { projects } from "@/db/schema"
import { desc, eq } from "drizzle-orm"

export async function getProjects(userId : string){
    const allProjects = await db.query.projects.findMany({
        where : eq(projects.userId , userId), 
        with : {
            tasks : true
        },
        orderBy : desc(projects.updatedAt)
    })
    return allProjects
}