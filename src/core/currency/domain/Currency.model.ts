import { CurrencyFormatter } from '@/core/common/helpers/CurrencyFormatter.helper';
import { CurrencyId } from '@/core/currency/domain/value-objects/CurrencyId.value';
import { CurrencyName } from '@/core/currency/domain/value-objects/CurrencyName.value';
import { CurrencyCode } from '@/core/currency/domain/value-objects/CurrencyCode.value';
import { CurrencyDecimals } from '@/core/currency/domain/value-objects/CurrencyDecimals.value';
import { CurrencyCountry } from '@/core/currency/domain/value-objects/CurrencyCountry.value';

export class Currency {
	id: CurrencyId;
	name: CurrencyName;
	code: CurrencyCode;
	decimals: CurrencyDecimals;
	countries: CurrencyCountry[];

	constructor() {
		this.id = new CurrencyId();
		this.name = new CurrencyName();
		this.code = new CurrencyCode();
		this.decimals = new CurrencyDecimals();
		this.countries = [];
	}

	format(value: number): string {
		return CurrencyFormatter.format(value, this.code.get(), this.decimals.get());
	}
}
