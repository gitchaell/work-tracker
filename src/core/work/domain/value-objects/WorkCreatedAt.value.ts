import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class WorkCreatedAt {
	private value: string;

	constructor() {
		this.value = new Date().toISOString();
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
			throw new ValidationError('Work created at is required');
		}
	}

	private safe(value: string): string {
		return value.trim();
	}
}
