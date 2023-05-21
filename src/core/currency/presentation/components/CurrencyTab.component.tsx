import { useContext, useEffect } from 'react';
import { Dropdown } from 'flowbite-react';

import { CurrencyIcon } from '@/core/currency/presentation/components/CurrencyIcon.component';
import { CurrencyItem } from '@/core/currency/presentation/components/CurrencyItem.component';
import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';

export const CurrencyTab = () => {
	const { currencies, currencySelected, selectCurrency, findCurrencies } = useContext(CurrencyContext);

	useEffect(() => {
		findCurrencies();
	}, []);

	return (
		<Dropdown
			label={<CurrencyIcon code={currencySelected?.code || 'USD'} />}
			color="dark"
			title="Select a currency"
		>
			{currencies.map((currency) => (
				<Dropdown.Item
					key={currency.code}
					className="flex items-center justify-center gap-2"
					onClick={() => selectCurrency(currency)}
				>
					<CurrencyItem currency={currency} />
				</Dropdown.Item>
			))}
		</Dropdown>
	);
};
