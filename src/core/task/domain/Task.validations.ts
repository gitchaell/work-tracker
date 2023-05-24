import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';
import { CreateTaskDTO, UpdateTaskDTO } from './Task.dto';

export class CreateTaskValidation {
	static execute(task: CreateTaskDTO) {
		if (!task.description) {
			throw new ValidationError('Task description is required');
		}

		if (task.totalAmount < 0) {
			throw new ValidationError('Task total amount must be greater than 0');
		}

		if (task.totalSeconds < 0) {
			throw new ValidationError('Task total seconds must be greater than 0');
		}

		if (task.done !== true && task.done !== false) {
			throw new ValidationError('Task done must be true or false');
		}

		if (task.status !== 'paused' && task.status !== 'running') {
			throw new ValidationError('Task status must be paused or running');
		}

		if (!task.workId) {
			throw new ValidationError('Task must be related to a work');
		}

		return true;
	}
}

export class UpdateTaskValidation {
	static execute(task: UpdateTaskDTO) {
		if (!task.id) {
			throw new ValidationError('Task id is required for update');
		}

		if (!task.description) {
			throw new ValidationError('Task description is required');
		}

		if (task.totalAmount < 0) {
			throw new ValidationError('Task total amount must be greater than 0');
		}

		if (task.totalSeconds < 0) {
			throw new ValidationError('Task total seconds must be greater than 0');
		}

		if (task.done !== true && task.done !== false) {
			throw new ValidationError('Task done must be true or false');
		}

		if (task.status !== 'paused' && task.status !== 'running') {
			throw new ValidationError('Task status must be paused or running');
		}

		if (!task.workId) {
			throw new ValidationError('Task must be related to a work');
		}

		return true;
	}
}
