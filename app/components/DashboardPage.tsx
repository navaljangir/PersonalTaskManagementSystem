'use calendar'
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getProjects } from "../lib/actions/project/getProjects";
import { authOptions } from "../lib/NextAuthOptions";
import { SortTasks } from "../lib/getSortedTasks";
import { MyCalendar } from "./ui/BigCalendar";

export async function DashboardPage() {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (!user) return redirect("/");
    const projects = await getProjects(user.id)
    const sortedTasks = SortTasks(projects.flatMap(p => p.tasks).slice(0, 9) , "asc")
    return (
        <div className="p-6 min-h-screen w-full mx-auto">
            <div className="flex flex-col">
             <div className="w-full h-full">
                    <MyCalendar projects={projects}/>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Project Dashboard</h1>
                    <Link href="/projects" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        + New Task
                    </Link>
                </div>
                {/* Recent projects secions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">{project.name}</h2>
                                {project.description && (
                                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                                )}
                            </div>
                            <div className="space-y-3">
                                {project.tasks.map((task) => (
                                    <div key={task.id} className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' :
                                                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                                }`} />
                                            <span className="text-sm font-medium text-gray-700">{task.title}</span>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                task.status === 'progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Tasks Section */}
                <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">All Tasks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedTasks.map((task) => (
                            <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-gray-800">{task.title}</h3>
                                        {task.dueDate && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Due: {new Date(task.dueDate).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <span className={`text-xs font-medium ${task.priority === 'high' ? 'text-red-600' :
                                            task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

               

            </div>
        </div>
    );
}