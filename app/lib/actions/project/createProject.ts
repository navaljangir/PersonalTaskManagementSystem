'use server'

import { db } from "@/db/db"
import { projects } from "@/db/schema"
import { revalidatePath } from "next/cache"

export async function createProject(userId : string , title : string, description : string){
    try{
        await db.insert(projects).values({
            userId : userId,
            name : title,
            description : description
        })
        revalidatePath('/dashboard')
        return {
        success : true,
        message : 'Successfully created Project'
        }
    }catch(e){
        console.log('Error while adding Project', e)
        return {
            success: false,
            message : 'Cannot create project'
        }
    }

}