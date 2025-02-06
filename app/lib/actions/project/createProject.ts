'use server'

import { db } from "@/db/db"
import { projects } from "@/db/schema"
import { revalidatePath } from "next/cache"

export async function createProject(userId : string , title : string, description : string){
    await db.insert(projects).values({
        userId : userId,
        name : title,
        description : description
    })
    revalidatePath('/projects')
    return {
        success : true,
        message : 'Successfully created Project'
    }
}