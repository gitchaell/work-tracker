import { DeleteTaskDTO } from '@/core/task/domain/Task.dto';
import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/application/helpers/TaskMapper.helper';
import { TaskDeletedEvent } from '@/core/task/application/events/TaskDeleted.event';
import { Task } from '@/core/task/domain/Task.entity';

export class DeleteTaskCommand {
	static execute(task: DeleteTaskDTO): Task {
		const taskData = TaskMapper.toTask(task);

		const taskDeleted = TaskRepository.delete(taskData);

		TaskDeletedEvent.publish({ task: taskDeleted });

		return taskDeleted;
	}
}
