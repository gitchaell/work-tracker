import { CreateTaskDTO } from '@/core/task/domain/Task.dto';
import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/application/helpers/TaskMapper.helper';
import { TaskCreatedEvent } from '@/core/task/application/events/TaskCreated.event';
import { Task } from '@/core/task/domain/Task.entity';

export class CreateTaskCommand {
	static execute(task: CreateTaskDTO): Task {
		const taskData = TaskMapper.toTask(task);

		const taskCreated = TaskRepository.create(taskData);

		TaskCreatedEvent.publish({ task: taskCreated });

		return taskCreated;
	}
}
