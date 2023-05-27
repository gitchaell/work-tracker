import { Response } from '@/core/common/interfaces/Response.interface';
import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskDeletedEvent } from '@/core/task/application/events/TaskDeleted.event';
import { TaskMapper } from '@/core/task/domain/Task.mapper';
import { DeleteTaskValidation } from '@/core/task/domain/Task.validations';
import { DeleteTaskDTO } from '@/core/task/domain/Task.dto';
import { Task } from '@/core/task/domain/Task.entity';

export class DeleteTaskCommand {
	static execute(task: DeleteTaskDTO): Response<Task | null> {
		try {
			const taskToDelete = TaskMapper.mapToDelete(task);

			DeleteTaskValidation.execute(taskToDelete);

			const taskDeleted = TaskRepository.delete(taskToDelete);

			TaskDeletedEvent.publish({ task: taskDeleted });

			return { data: taskDeleted };
		} catch (error) {
			if (error instanceof ValidationError) {
				return { data: null, error: error.message };
			}

			return { data: null, error: 'Internal server error' };
		}
	}
}
