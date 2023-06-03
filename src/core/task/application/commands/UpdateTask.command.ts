import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskUpdatedEvent } from '@/core/task/application/events/TaskUpdated.event';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { Task } from '@/core/task/domain/Task.model';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';

export class UpdateTaskCommand {
	static execute(task: Task | TaskEntity): TaskEntity {
		if (task instanceof Task) {
			task = TaskMapper.toEntity(task);
		}

		const taskUpdated = TaskRepository.update(task);

		TaskUpdatedEvent.publish({ task: taskUpdated });

		return taskUpdated;
	}
}
