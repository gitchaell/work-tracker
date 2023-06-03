import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskUpdatedEvent } from '@/core/task/application/events/TaskUpdated.event';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';

export class UpdateTaskCommand {
	static execute(task: TaskEntity): TaskEntity {
		const taskUpdated = TaskRepository.update(task);

		TaskUpdatedEvent.publish({ task: taskUpdated });

		return taskUpdated;
	}
}
