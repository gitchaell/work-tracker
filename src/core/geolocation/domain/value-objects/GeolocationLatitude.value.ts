import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';

export class GeolocationLatitude {
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
			throw new ValidationError('Geolocation latitude is required');
		}

		if (value < -90 || value > 90) {
			throw new ValidationError('Geolocation latitude must be between -90 and 90');
		}
	}

	private safe(value: number): number {
		return value;
	}
}
