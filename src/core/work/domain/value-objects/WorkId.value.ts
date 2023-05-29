import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class WorkId {
	private value: string;

	constructor() {
		this.value = 'Id not provided';
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
			throw new ValidationError('Task id is required');
		}
	}

	private safe(value: string): string {
		return value.trim();
	}
}
