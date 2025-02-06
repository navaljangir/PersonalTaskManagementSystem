import { db } from "@/db/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteProject(projectId: number){
    try{
        await db.delete(projects).where(eq(projects.id , projectId)).returning({
            id : projects.id
        })
    }catch(e){
        console.log('Deleting error',e)
        return 'Not able to delete'
    }
}