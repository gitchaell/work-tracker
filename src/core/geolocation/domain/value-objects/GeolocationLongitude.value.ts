import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class GeolocationLongitude {
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

	private validate(value: number): void {
		if (!value) {
			throw new ValidationError('Geolocation longitude is required');
		}

		if (value < -180 || value > 180) {
			throw new ValidationError('Geolocation longitude must be between -180 and 180');
		}
	}

	private safe(value: number): number {
		return value;
	}
}
