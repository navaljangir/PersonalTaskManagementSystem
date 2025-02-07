// project-card.tsx
"use client";
import { CreateTask } from "./create-task";
import { DeleteProject } from "./delete-project";
import { EditProject } from "./edit-project";
import { TaskCard } from "./tasks-card";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/app/lib/actions/project/getProjects";
import { useSession } from "next-auth/react";

export function ProjectCard() {
  const session = useSession()
  const userId = session.data?.user.id
  
  const {data : allProjects , isLoading} = useQuery({
    queryKey : ['getAllProjects' , userId],
    queryFn : async()=> {
      if(userId){
        console.log('called')
       const res =await getProjects(userId)
       return res
      }
      return []
    }
  })
  if(isLoading){
    return <div className="w-full flex justify-center">Loading...</div>
  }
  if(!allProjects){
    return <div className="w-full flex justify-center">No result</div>
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allProjects.map((project, index) => {
        return <div className="border rounded-lg p-4 bg-card shadow-sm" key={index}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex">
              <h3 className="text-lg font-semibold truncate w-28">{project.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <EditProject project={project} />
              <DeleteProject projectId={project.id} />
              <CreateTask projectId={project.id} />
            </div>

          </div>
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground truncate w-full">
              {project.description}
            </p>
            <span className="text-sm">Updated At:{format(new Date(project.updatedAt!), 'dd/MM/y')}</span>
          </div>
          
          <TaskCard tasks={project.tasks}/>

        </div>
      })}
    </div>
  );
}