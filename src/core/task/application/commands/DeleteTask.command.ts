import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskDeletedEvent } from '@/core/task/application/events/TaskDeleted.event';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';

export class DeleteTaskCommand {
	static execute(task: TaskEntity): TaskEntity {
		const taskDeleted = TaskRepository.delete(task);

		TaskDeletedEvent.publish({ task: taskDeleted });

		return taskDeleted;
	}
}
