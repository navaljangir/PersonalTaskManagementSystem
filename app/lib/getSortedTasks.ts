import { taskType } from "@/lib/types";

export function SortTasks(tasks: taskType[] , sortPriority: string) {
    const sortedTasks = [...tasks].sort((a, b) => {
        const statusOrder = { progress: 1, pending: 2, completed: 3 } as const;
        const statusA = statusOrder[a.status as keyof typeof statusOrder] || 3;
        const statusB = statusOrder[b.status as keyof typeof statusOrder] || 3;
        if (statusA !== statusB) return statusA - statusB;

        const priorityOrder = { high: 3, medium: 2, low: 1 } as const;
        const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] || 1;
        const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] || 1;
        const priorityCompare = sortPriority === "asc" ? priorityA - priorityB : priorityB - priorityA;
        if (priorityCompare !== 0) return priorityCompare;

        return (a.dueDate!).getTime() - (b.dueDate!).getTime();
    });
    return sortedTasks
}