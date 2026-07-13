import { Task } from '../core/types';

export class TaskQueue {
  private tasks: Map<string, Task> = new Map();
  private queue: string[] = []; // IDs of tasks waiting to be processed

  /**
   * Initializes the queue with a set of planned tasks.
   */
  initialize(plannedTasks: Task[]) {
    this.tasks.clear();
    this.queue = [];
    plannedTasks.forEach(task => {
      this.tasks.set(task.id, task);
      if (task.status === 'pending') {
        this.queue.push(task.id);
      }
    });
  }

  /**
   * Gets the next available task whose dependencies are met.
   */
  getNextTask(): Task | null {
    for (let i = 0; i < this.queue.length; i++) {
      const taskId = this.queue[i];
      const task = this.tasks.get(taskId);
      if (!task) continue;

      if (this.areDependenciesMet(task)) {
        this.queue.splice(i, 1);
        task.status = 'in_progress';
        this.tasks.set(task.id, task);
        return task;
      }
    }
    return null;
  }

  /**
   * Checks if a task's dependencies have been successfully completed.
   */
  private areDependenciesMet(task: Task): boolean {
    if (!task.dependencies || task.dependencies.length === 0) return true;
    
    return task.dependencies.every(depId => {
      const depTask = this.tasks.get(depId);
      return depTask && depTask.status === 'completed';
    });
  }

  /**
   * Marks a task as completed and stores its result.
   */
  markCompleted(taskId: string, result: any) {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'completed';
      task.result = result;
      this.tasks.set(taskId, task);
    }
  }

  /**
   * Marks a task as failed.
   */
  markFailed(taskId: string, error: any) {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'failed';
      task.result = error;
      this.tasks.set(taskId, task);
    }
  }

  /**
   * Returns all tasks.
   */
  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  /**
   * Checks if the queue is entirely complete (success or failure).
   */
  isComplete(): boolean {
    const allTasks = this.getAllTasks();
    return allTasks.every(t => t.status === 'completed' || t.status === 'failed');
  }
}
