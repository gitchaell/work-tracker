import { createContext } from 'react';

import { Currency } from '@/core/currency/domain/Currency.entity';

interface CurrencyContextProps {
	currencySelected: Currency | null;
	selectCurrency: (currency: Currency) => void;
	unselectCurrency: () => void;
}

export const CurrencyContext = createContext<CurrencyContextProps>({
	currencySelected: null,
	selectCurrency: () => {
		throw new Error('Not implemented');
	},
	unselectCurrency: () => {
		throw new Error('Not implemented');
	},
});
