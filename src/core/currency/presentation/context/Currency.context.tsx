import { createContext } from 'react';

import { NotImplementedError } from '@/core/common/helpers/ErrorHandlers.helper';
import { Currency } from '@/core/currency/domain/Currency.model';

interface CurrencyContextProps {
	currencies: Currency[];
	currencySelected: Currency | null;
	selectCurrency: (currency: Currency) => void;
	unselectCurrency: () => void;
}

export const CurrencyContext = createContext<CurrencyContextProps>({
	currencies: [],
	currencySelected: null,
	selectCurrency: () => {
		throw new NotImplementedError('selectCurrency() method not implemented');
	},
	unselectCurrency: () => {
		throw new NotImplementedError('unselectCurrency method not implemented');
	},
});
