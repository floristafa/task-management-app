import { Task } from "../types/task";

// Asynchronously retrieves tasks from localStorage after simulating a delay.
export const getTasks = async (): Promise<Task[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
                resolve(tasks);
            } catch (error) {
                reject(new Error("Failed to retrieve tasks from localStorage"));
            }
        }, 500);
    });
};

// Asynchronously creates a new task in localStorage after simulating a delay.
export const createTask = async (task: Task): Promise<Task> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                tasks.push(task);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                resolve(task);
            } catch (error) {
                reject(new Error("Failed to create task"));
            }
        }, 500);
    });
};

// Asynchronously updates an existing task in localStorage after simulating a delay.
export const updateTask = async (updatedTask: Task): Promise<Task> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
                const index = tasks.findIndex(task => task.id === updatedTask.id);

                if (index === -1) {
                    return reject(new Error("Task not found"));
                }

                tasks[index] = updatedTask;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                resolve(updatedTask);
            } catch (error) {
                reject(new Error("Failed to update task"));
            }
        }, 500);
    });
};

// Asynchronously deletes a task from localStorage by its ID after simulating a delay.
export const deleteTask = async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
                const filteredTasks = tasks.filter(task => task.id !== id);
                localStorage.setItem('tasks', JSON.stringify(filteredTasks));
                resolve();
            } catch (error) {
                reject(new Error("Failed to delete task"));
            }
        }, 500);
    });
};
