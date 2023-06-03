import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskCreatedEvent } from '@/core/task/application/events/TaskCreated.event';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { Task } from '@/core/task/domain/Task.model';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';

export class CreateTaskCommand {
	static execute(task: Task | TaskEntity): TaskEntity {
		if (task instanceof Task) {
			task = TaskMapper.toEntity(task);
		}

		const taskCreated = TaskRepository.create(task);

		TaskCreatedEvent.publish({ task: taskCreated });

		return taskCreated;
	}
}
