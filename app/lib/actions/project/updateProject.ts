'use server'

import { db } from "@/db/db"
import { projects } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateProject(id : number, projectName: string, projectDescription : string){
    try{
        await db.update(projects).set({
            name: projectName,
            description : projectDescription,
            updatedAt : sql`Now()`
        }).where(eq(projects.id , id))
        revalidatePath('/dashboard')
        return {
            success: true,
            message : 'Updated Successfully'
        }
    }catch{
        return {
            success :false,
            message : 'Not updated'
        }
    }
}