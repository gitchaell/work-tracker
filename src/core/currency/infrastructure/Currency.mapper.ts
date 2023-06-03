import { Currency } from '@/core/currency/domain/Currency.model';
import { CurrencyEntity } from '@/core/currency/domain/entities/Currency.entity';
import { CurrencyCountry } from '@/core/currency/domain/value-objects/CurrencyCountry.value';

export class CurrencyMapper {
	static toEntity(currency: Currency): CurrencyEntity {
		return {
			id: currency.id.get(),
			name: currency.name.get(),
			code: currency.code.get(),
			decimals: currency.decimals.get(),
			countries: currency.countries.map((country) => country.get()),
		};
	}

	static toModel(currencyEntity: CurrencyEntity): Currency {
		const currency = new Currency();

		currency.id.set(currencyEntity.id);
		currency.name.set(currencyEntity.name);
		currency.code.set(currencyEntity.code);
		currency.decimals.set(currencyEntity.decimals);
		currency.countries.push(...currencyEntity.countries.map((country) => new CurrencyCountry(country)));

		return currency;
	}
}
