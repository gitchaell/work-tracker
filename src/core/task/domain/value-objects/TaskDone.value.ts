import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class TaskDone {
	private value: boolean;

	constructor() {
		this.value = false;
	}

	get(): boolean {
		return this.value;
	}

	set(value: boolean): void {
		this.validate(value);
		this.value = this.safe(value);
	}

	private validate(value: boolean): void {
		if (value === null || value === undefined) {
			throw new ValidationError('Task done value cannot be null or undefined');
		}

		if (typeof value !== 'boolean') {
			throw new ValidationError('Task done value must be a boolean');
		}
	}

	private safe(value: boolean): boolean {
		return value;
	}
}
