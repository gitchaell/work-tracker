import { CurrencyFormatter } from '@/core/common/helpers/CurrencyFormatter.helper';
import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';
import { Currency } from '@/core/currency/domain/Currency.model';

export class TaskAmount {
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

	format(currency: Currency): string {
		return CurrencyFormatter.format(this.value, currency.code.get(), currency.decimals.get());
	}

	private validate(value: number): void {
		if (value === null || value === undefined) {
			throw new ValidationError('Task amount value cannot be null or undefined');
		}

		if (value === Infinity || value === -Infinity) {
			throw new ValidationError('Task amount value cannot be Infinity or -Infinity');
		}

		if (isNaN(value)) {
			throw new ValidationError('Task amount value cannot be NaN');
		}

		if (value < 0) {
			throw new ValidationError('Task amount value cannot be less than 0');
		}
	}

	private safe(value: number): number {
		return value;
	}
}
