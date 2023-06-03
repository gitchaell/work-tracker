import { useCallback, useEffect, useReducer, useState } from 'react';

import { Currency } from '@/core/currency/domain/Currency.model';
import { CurrencyService } from '@/core/currency/application/Currency.service';
import { CurrencyState } from '@/core/currency/presentation/state/Currency.state';
import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';
import {
	GeolocationSavedEvent,
	GeolocationSavedEventListener,
} from '@/core/geolocation/application/events/GeolocationSaved.event';
import { CurrencyMapper } from '@/core/currency/infrastructure/Currency.mapper';

export const CurrencyProvider = ({ children }: { children: JSX.Element }) => {
	const [currencies] = useState(CurrencyService.findCurrencies().map(CurrencyMapper.toModel));

	const [{ currencySelected }, dispatch] = useReducer(
		CurrencyState.reducer,
		CurrencyState.initialState,
		CurrencyState.initializer
	);

	const selectCurrency = useCallback((currency: Currency) => {
		dispatch({ type: 'currency/selected', payload: CurrencyMapper.toEntity(currency) });
	}, []);

	const unselectCurrency = useCallback(() => {
		dispatch({ type: 'currency/unselected', payload: null });
	}, []);

	useEffect(() => {
		const handleChangeGeolocation: GeolocationSavedEventListener = (event) => {
			const { geolocation } = event.detail;

			const currency = CurrencyService.findCurrencyByCountry({ country: geolocation.country });

			if (currency) {
				selectCurrency(CurrencyMapper.toModel(currency));
			}
		};

		GeolocationSavedEvent.subscribe(handleChangeGeolocation);

		return () => {
			GeolocationSavedEvent.unsubscribe(handleChangeGeolocation);
		};
	}, []);

	return (
		<CurrencyContext.Provider
			value={{
				currencies,
				currencySelected: currencySelected ? CurrencyMapper.toModel(currencySelected) : null,
				selectCurrency,
				unselectCurrency,
			}}
		>
			{children}
		</CurrencyContext.Provider>
	);
};
