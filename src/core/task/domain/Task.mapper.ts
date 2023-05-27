import { Task } from '@/core/task/domain/Task.entity';
import { CreateTaskDTO, DeleteTaskDTO, UpdateTaskDTO } from '@/core/task/domain/Task.dto';

export class TaskMapper {
	static defaultValues = {
		totalSeconds: 0,
		totalAmount: 0,
		done: false,
		status: 'paused',
	};

	static mapToCreate(task: CreateTaskDTO): Task {
		return {
			id: '',
			description: task.description,
			totalSeconds: task.totalSeconds || this.defaultValues.totalSeconds,
			totalAmount: task.totalAmount || this.defaultValues.totalAmount,
			done: task.done || this.defaultValues.done,
			status: task.status || this.defaultValues.status,
			workId: task.workId,
		};
	}

	static mapToUpdate(task: UpdateTaskDTO): Task {
		return {
			id: task.id,
			description: task.description,
			totalSeconds: task.totalSeconds || this.defaultValues.totalSeconds,
			totalAmount: task.totalAmount || this.defaultValues.totalAmount,
			done: task.done || this.defaultValues.done,
			status: task.status || this.defaultValues.status,
			workId: task.workId,
		};
	}

	static mapToDelete(task: DeleteTaskDTO): Task {
		return {
			id: task.id,
		} as Task;
	}
}
