import { MultiRepository } from '@/base';
import { CurrenciesData, Currency } from '.';

class _CurrenciesRepository extends MultiRepository<Currency> {
	getAll(): Currency[] {
		return CurrenciesData;
	}

	getBy(country: string) {
		return (
			this.getAll().find((currency) =>
				currency.countries.some((item) => item.includes(country))
			) || this.getAll()[0]
		);
	}
}

export const CurrenciesRepository = new _CurrenciesRepository('Currencies');
