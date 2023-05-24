import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';
import { CreateTaskDTO } from '@/core/task/domain/Task.dto';
import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/application/helpers/TaskMapper.helper';
import { TaskCreatedEvent } from '@/core/task/application/events/TaskCreated.event';
import { Task } from '@/core/task/domain/Task.entity';
import { CreateTaskValidation } from '@/core/task/domain/Task.validations';

export class CreateTaskCommand {
	static execute(task: CreateTaskDTO): Task | null {
		try {
			const taskData = TaskMapper.toTask(task);

			CreateTaskValidation.execute(taskData);

			const taskCreated = TaskRepository.create(taskData);

			TaskCreatedEvent.publish({ task: taskCreated });

			return taskCreated;
		} catch (error) {
			if (error instanceof ValidationError) {
				console.error(error);
			}

			return null;
		}
	}
}
