import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';
import { TaskDeletedEvent } from '@/core/task/application/events/TaskDeleted.event';
import { Task } from '@/core/task/domain/Task.model';

export class DeleteTaskCommand {
	static execute(task: Task): Task {
		const taskEntity = TaskMapper.toEntity(task);

		const taskDeleted = TaskRepository.delete(taskEntity);

		const taskModel = TaskMapper.toModel(taskDeleted);

		TaskDeletedEvent.publish({ task: taskModel });

		return taskModel;
	}
}
