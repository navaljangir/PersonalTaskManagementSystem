import { authOptions } from "@/app/lib/NextAuthOptions";
import { CreateProject } from "@/app/components/project/create-project";
import { ProjectCard } from "@/app/components/project/project-card";
// import { getCurrentUser } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getProjects } from "@/app/lib/actions/project/getProjects";

export default async function ProjectsPage() {
    const session =await getServerSession(authOptions)
    const user =session?.user
    if (!user) return redirect("/dashboard");

  const allProjects = await getProjects(user.id)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <CreateProject />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.map((projectWithTasks) => (
          <ProjectCard
            key={projectWithTasks.id}
            project={projectWithTasks}
            tasks={projectWithTasks.tasks}
          />
        ))}
      </div>
    </div>
  );
}