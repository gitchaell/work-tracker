import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class TaskDescription {
	private value: string;

	constructor() {
		this.value = 'Description not provided';
	}

	get(): string {
		return this.value;
	}

	set(value: string): void {
		this.validate(value);
		this.value = this.safe(value);
	}

	private validate(value: string): void {
		if (!value) {
			throw new ValidationError('Task description is required');
		}

		if (value.length < 5) {
			throw new ValidationError('Task description must be at least 5 characters long');
		}

		if (value.length > 255) {
			throw new ValidationError('Task description must be less than 255 characters long');
		}
	}

	private safe(value: string): string {
		return value.trim().replace(/\s+/g, ' ');
	}
}
