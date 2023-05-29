import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class TaskSeconds {
	private value: number;

	constructor() {
		this.value = 0;
	}

	get(): number {
		return this.value;
	}

	set(value: number): void {
		this.validate(value);
		this.value = this.safe(value);
	}

	add(value: number): void {
		this.validate(value);
		this.value += this.safe(value);
	}

	private validate(value: number): void {
		if (value === null || value === undefined) {
			throw new ValidationError('Task seconds value cannot be null or undefined');
		}

		if (value === Infinity || value === -Infinity) {
			throw new ValidationError('Task seconds value cannot be Infinity or -Infinity');
		}

		if (isNaN(value)) {
			throw new ValidationError('Task seconds value cannot be NaN');
		}

		if (value < 0) {
			throw new ValidationError('Task seconds value cannot be less than 0');
		}
	}

	private safe(value: number): number {
		return Math.round(value);
	}
}
