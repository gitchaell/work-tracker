import { Response } from '@/core/common/interfaces/Response.interface';
import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

import { UpdateTaskDTO } from '@/core/task/domain/Task.dto';
import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/domain/Task.mapper';
import { TaskUpdatedEvent } from '@/core/task/application/events/TaskUpdated.event';
import { Task } from '@/core/task/domain/Task.entity';
import { UpdateTaskValidation } from '@/core/task/domain/Task.validations';

export class UpdateTaskCommand {
	static execute(task: UpdateTaskDTO): Response<Task | null> {
		try {
			const taskToUpdate = TaskMapper.mapToUpdate(task);

			UpdateTaskValidation.execute(taskToUpdate);

			const taskUpdated = TaskRepository.update(taskToUpdate);

			TaskUpdatedEvent.publish({ task: taskUpdated });

			return { data: taskUpdated };
		} catch (error) {
			if (error instanceof ValidationError) {
				return { data: null, error: error.message };
			}

			return { data: null, error: 'Internal server error' };
		}
	}
}
