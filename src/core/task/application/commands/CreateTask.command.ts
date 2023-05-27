import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';
import { Response } from '@/core/common/interfaces/Response.interface';

import { CreateTaskDTO } from '@/core/task/domain/Task.dto';
import { TaskRepository } from '@/core/task/infrastructure/Task.repository';
import { TaskMapper } from '@/core/task/domain/Task.mapper';
import { TaskCreatedEvent } from '@/core/task/application/events/TaskCreated.event';
import { Task } from '@/core/task/domain/Task.entity';
import { CreateTaskValidation } from '@/core/task/domain/Task.validations';

export class CreateTaskCommand {
	static execute(task: CreateTaskDTO): Response<Task | null> {
		try {
			const taskToCreate = TaskMapper.mapToCreate(task);

			CreateTaskValidation.execute(taskToCreate);

			const taskCreated = TaskRepository.create(taskToCreate);

			TaskCreatedEvent.publish({ task: taskCreated });

			return { data: taskCreated };
		} catch (error) {
			if (error instanceof ValidationError) {
				return { data: null, error: error.message };
			}

			return { data: null, error: 'Internal server error' };
		}
	}
}
