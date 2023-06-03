import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskCreatedEvent } from '@/core/task/application/events/TaskCreated.event';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';

export class CreateTaskCommand {
	static execute(task: TaskEntity): TaskEntity {
		const taskCreated = TaskRepository.create(task);

		TaskCreatedEvent.publish({ task: taskCreated });

		return taskCreated;
	}
}
