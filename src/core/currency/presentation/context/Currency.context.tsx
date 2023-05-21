import { createContext } from 'react';

import { Currency } from '@/core/currency/domain/Currency.entity';

interface CurrencyContextProps {
	currencies: Currency[];
	currencySelected: Currency | null;
	findCurrencies: () => Currency[];
	selectCurrency: (currency: Currency) => void;
	unselectCurrency: () => void;
}

export const CurrencyContext = createContext<CurrencyContextProps>({
	currencies: [],
	currencySelected: null,
	findCurrencies: () => {
		throw new Error('findCurrencies() method not implemented');
	},
	selectCurrency: () => {
		throw new Error('selectCurrency() method not implemented');
	},
	unselectCurrency: () => {
		throw new Error('unselectCurrency method not implemented');
	},
});
