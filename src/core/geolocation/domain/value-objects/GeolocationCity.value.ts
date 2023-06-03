import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class GeolocationCity {
	private value: string;

	constructor() {
		this.value = 'Not provided';
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
			throw new ValidationError('Geolocation city is required');
		}
	}

	private safe(value: string): string {
		return value.trim().replace(/\s+/g, ' ');
	}
}
