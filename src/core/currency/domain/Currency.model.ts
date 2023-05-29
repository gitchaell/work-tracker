import { CurrencyId } from '@/core/currency/domain/value-objects/CurrencyId.value';
import { CurrencyName } from '@/core/currency/domain/value-objects/CurrencyName.value';
import { CurrencyCode } from '@/core/currency/domain/value-objects/CurrencyCode.value';
import { CurrencyDecimals } from '@/core/currency/domain/value-objects/CurrencyDecimals.value';
import { CurrencyCountry } from '@/core/currency/domain/value-objects/CurrencyCountry.value';
import { CurrencyEntity } from '@/core/currency/domain/entities/Currency.entity';

export class Currency {
	id: CurrencyId;
	name: CurrencyName;
	code: CurrencyCode;
	decimals: CurrencyDecimals;
	countries: CurrencyCountry[];

	static from(entity: CurrencyEntity): Currency {
		const currency = new Currency();

		currency.id.set(entity.id);
		currency.name.set(entity.name);
		currency.code.set(entity.code);
		currency.decimals.set(entity.decimals);
		currency.countries.push(...entity.countries.map((country) => new CurrencyCountry(country)));

		return currency;
	}

	constructor() {
		this.id = new CurrencyId();
		this.name = new CurrencyName();
		this.code = new CurrencyCode();
		this.decimals = new CurrencyDecimals();
		this.countries = [];
	}
}
