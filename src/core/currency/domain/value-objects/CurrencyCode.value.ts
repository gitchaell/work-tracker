import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class CurrencyCode {
	private value: string;

	constructor() {
		this.value = 'Code not provided';
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
			throw new ValidationError('Currency code is required');
		}

		if (value.length < 3) {
			throw new ValidationError('Currency code must be at least 3 characters long');
		}

		if (value.length > 5) {
			throw new ValidationError('Currency code must be less than 5 characters long');
		}
	}

	private safe(value: string): string {
		return value.trim().replace(/\s+/g, ' ');
	}
}
