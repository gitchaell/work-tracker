import { v4 as uuidv4 } from 'uuid';
import CurrencyCodes from 'currency-codes';
import { GeolocationAPI } from './geolocation.api';
import { Currency } from '../core/currency/currency.entity';

export class CurrencyAPI {
	static async getUserCurrency(): Promise<Currency> {
		const userCountry = await GeolocationAPI.getUserCountry();

		const country = CurrencyCodes.countries().find((name) =>
			name.includes(userCountry || 'United States')
		);

		const currency = CurrencyCodes.country(country || 'United States');

		return {
			id: uuidv4(),
			country: country || 'unknown',
			code: currency?.[0]?.code || 'unknown',
		} as Currency;
	}
}
