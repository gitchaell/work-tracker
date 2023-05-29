import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class CurrencyName {
	private value: string;

	constructor() {
		this.value = 'Name not provided';
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
			throw new ValidationError('Currency name is required');
		}

		if (value.length < 5) {
			throw new ValidationError('Currency name must be at least 5 characters long');
		}

		if (value.length > 255) {
			throw new ValidationError('Currency name must be less than 255 characters long');
		}
	}

	private safe(value: string): string {
		return value.trim().replace(/\s+/g, ' ');
	}
}
