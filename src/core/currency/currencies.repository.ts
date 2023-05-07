import { MultiRepository } from '../base/multi.repository copy';
import { CurrenciesData } from './currencies.data';
import { Currency } from './currency.entity';

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
