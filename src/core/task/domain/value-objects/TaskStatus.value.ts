import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';
import { TaskStatusValues } from '@/core/task/domain/entities/Task.entity';

export class TaskStatus {
	private value: TaskStatusValues;

	constructor() {
		this.value = 'paused';
	}

	get(): TaskStatusValues {
		return this.value;
	}

	set(value: TaskStatusValues): void {
		this.validate(value);
		this.value = this.safe(value);
	}

	private validate(value: TaskStatusValues): void {
		if (!value) {
			throw new ValidationError('Task status is required');
		}

		if (typeof value !== 'string') {
			throw new ValidationError('Task status must be a string');
		}

		if (!['paused', 'running'].includes(value)) {
			throw new ValidationError('Task status must be paused or running');
		}
	}

	private safe(value: TaskStatusValues): TaskStatusValues {
		return value as TaskStatusValues;
	}
}
