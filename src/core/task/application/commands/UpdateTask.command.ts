import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';
import { TaskUpdatedEvent } from '@/core/task/application/events/TaskUpdated.event';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { Task } from '@/core/task/domain/Task.model';

export class UpdateTaskCommand {
	static execute(task: TaskEntity): Task {
		const taskUpdated = TaskRepository.update(task);

		const taskModel = TaskMapper.toModel(taskUpdated);

		TaskUpdatedEvent.publish({ task: taskUpdated });

		return taskModel;
	}
}
