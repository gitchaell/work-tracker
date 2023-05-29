import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';
import { TaskCreatedEvent } from '@/core/task/application/events/TaskCreated.event';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { Task } from '@/core/task/domain/Task.model';

export class CreateTaskCommand {
	static execute(task: TaskEntity): Task {
		const taskCreated = TaskRepository.create(task);

		const taskModel = TaskMapper.toModel(taskCreated);

		TaskCreatedEvent.publish({ task: taskCreated });

		return taskModel;
	}
}
