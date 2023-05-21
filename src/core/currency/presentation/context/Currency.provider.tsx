import { useCallback, useReducer, useState } from 'react';

import { Currency } from '@/core/currency/domain/Currency.entity';
import { CurrencyService } from '@/core/currency/application/Currency.service';
import {
	CurrencyInitialState,
	CurrencyReducer,
	CurrencyStateInitializer,
} from '@/core/currency/presentation/state/Currency.state';
import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';

export const CurrencyProvider = ({ children }: { children: JSX.Element }) => {
	const [currencies, setCurrencies] = useState([] as Currency[]);
	const [{ currencySelected }, dispatch] = useReducer(
		CurrencyReducer,
		CurrencyInitialState,
		CurrencyStateInitializer
	);

	const findCurrencies = useCallback(() => {
		const currencies = CurrencyService.findCurrencies();
		setCurrencies(currencies);
		return currencies;
	}, []);

	const selectCurrency = useCallback((currency: Currency) => {
		dispatch({ type: 'currency/selected', payload: currency });
	}, []);

	const unselectCurrency = useCallback(() => {
		dispatch({ type: 'currency/unselected', payload: null });
	}, []);

	// TODO: Subscribe to GeolocationSaveEvent and change currencySelected

	return (
		<CurrencyContext.Provider
			value={{
				currencies,
				currencySelected,
				findCurrencies,
				selectCurrency,
				unselectCurrency,
			}}
		>
			{children}
		</CurrencyContext.Provider>
	);
};
