import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskDeletedEvent } from '@/core/task/application/events/TaskDeleted.event';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { Task } from '@/core/task/domain/Task.model';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';

export class DeleteTaskCommand {
	static execute(task: Task | TaskEntity): TaskEntity {
		if (task instanceof Task) {
			task = TaskMapper.toEntity(task);
		}

		const taskDeleted = TaskRepository.delete(task);

		TaskDeletedEvent.publish({ task: taskDeleted });

		return taskDeleted;
	}
}
