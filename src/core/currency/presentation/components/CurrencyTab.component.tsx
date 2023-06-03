import { useContext } from 'react';
import { Dropdown } from 'flowbite-react';

import { CurrencyIcon } from '@/core/currency/presentation/components/CurrencyIcon.component';
import { CurrencyItem } from '@/core/currency/presentation/components/CurrencyItem.component';
import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';

export const CurrencyTab = () => {
	const { currencies, currencySelected, selectCurrency } = useContext(CurrencyContext);

	if (!currencySelected) {
		return null;
	}

	return (
		<Dropdown
			label={<CurrencyIcon code={currencySelected.code.get() || 'USD'} />}
			color="dark"
			title="Select a currency"
		>
			{currencies.map((currency) => (
				<Dropdown.Item
					key={currency.code.get()}
					className="flex items-center justify-center gap-2"
					onClick={() => selectCurrency(currency)}
				>
					<CurrencyItem currency={currency} />
				</Dropdown.Item>
			))}
		</Dropdown>
	);
};
