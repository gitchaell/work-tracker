import { useEffect, useReducer } from 'react';

import { Currency } from '@/core/currency/domain/Currency.entity';
import {
	CurrencyInitialState,
	CurrencyReducer,
	CurrencyStateInitializer,
} from '@/core/currency/presentation/state/Currency.state';
import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';

export const CurrencyProvider = ({ children }: { children: JSX.Element }) => {
	const [state, dispatch] = useReducer(CurrencyReducer, CurrencyInitialState, CurrencyStateInitializer);

	const selectCurrency = (currency: Currency) => {
		dispatch({ type: 'currency/selected', payload: currency });
	};

	const unselectCurrency = () => {
		dispatch({ type: 'currency/unselected', payload: null });
	};

	return (
		<CurrencyContext.Provider
			value={{
				currencySelected: state.currencySelected,
				selectCurrency,
				unselectCurrency,
			}}
		>
			{children}
		</CurrencyContext.Provider>
	);
};
