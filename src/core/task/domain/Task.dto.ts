import { Task } from './Task.entity';

export type CreateTaskDTO = Omit<Task, 'id'>;

export type UpdateTaskDTO = Task;

export type DeleteTaskDTO = Pick<Task, 'id'>;

export interface FindTasksDTO {
	status: 'all' | 'pending' | 'done';
	workId: string;
}
