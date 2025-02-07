import { db } from "@/db/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteProject(projectId: number){
    try{
        await db.delete(projects).where(eq(projects.id , projectId)).returning({
            id : projects.id
        })
        revalidatePath('/dashboard')
        return {
            success : false,
            message : 'Deleted Successfully'
        }
    }catch(e){
        console.log('Deleting error',e)
        return {
            success : false,
            message : 'Cannot delete'
        }
    }
}