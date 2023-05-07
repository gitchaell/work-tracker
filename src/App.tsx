import { useCallback, useEffect, useState } from 'react';
import { CurrencyAPI } from './api/currency.api';
import { CurrencyRepository } from './core/currency/currency.repository';
import { CurrencyTab } from './core/currency/currency.tab';

function App() {
	const [currency, setCurrency] = useState(
		CurrencyRepository.getAll().find((currency) => currency.selected)
	);

	const setDefaultCurrency = useCallback(() => {
		if (currency) return;

		CurrencyAPI.getUserCurrency().then((defaultCurrency) => {
			CurrencyRepository.create({ ...defaultCurrency, selected: true });
			setCurrency(currency);
		});
	}, [currency]);

	useEffect(() => {
		setDefaultCurrency();
	}, [setDefaultCurrency]);

	return <>{currency && <CurrencyTab currency={currency} />}</>;
}

export default App;
