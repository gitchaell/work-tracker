import { Task } from '@/core/task/domain/Task.entity';

export class TaskMapper {
	static toTask(taskDTO: Partial<Task>): Task {
		return {
			id: taskDTO.id,
			description: taskDTO.description,
			totalSeconds: taskDTO.totalSeconds ?? 0,
			totalAmount: taskDTO.totalAmount ?? 0,
			done: taskDTO.done || false,
			status: taskDTO.status || 'paused',
			workId: taskDTO.workId,
		} as Task;
	}
}
