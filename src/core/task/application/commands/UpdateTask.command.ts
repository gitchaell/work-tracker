import { UpdateTaskDTO } from '@/core/task/domain/Task.dto';
import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/application/helpers/TaskMapper.helper';
import { TaskUpdatedEvent } from '@/core/task/application/events/TaskUpdated.event';
import { Task } from '@/core/task/domain/Task.entity';

export class UpdateTaskCommand {
	static execute(task: UpdateTaskDTO): Task {
		const taskData = TaskMapper.toTask(task);

		const taskUpdated = TaskRepository.update(taskData);

		TaskUpdatedEvent.publish({ task: taskUpdated });

		return taskUpdated;
	}
}
