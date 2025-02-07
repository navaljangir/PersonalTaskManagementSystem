export interface taskType{
        id: number;
        userId: string;
        projectId: number | null;
        title: string;
        description: string | null;
        status: "pending" | "progress" | "completed" | null;
        priority: string | null;
        dueDate: Date | null;
        createdAt: Date | null;
        updatedAt: Date | null;
}

export interface projectType{
    id: number;
    userId: string;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    tasks :  taskType[]
}


