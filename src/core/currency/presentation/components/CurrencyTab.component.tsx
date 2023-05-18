import { useContext } from 'react';
import { Dropdown } from 'flowbite-react';

import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';
import { CurrencyService } from '@/core/currency/application/Currency.service';
import { CurrencyIcon } from '@/core/currency/presentation/components/CurrencyIcon.component';
import { CurrencyItem } from '@/core/currency/presentation/components/CurrencyItem.component';

export const CurrencyTab = () => {
	const { currencySelected, selectCurrency } = useContext(CurrencyContext);
	const { findAllCurrencies } = CurrencyService();
	const { data: currencies, loading } = findAllCurrencies();

	return (
		<Dropdown
			label={<CurrencyIcon code={currencySelected?.code || 'USD'} />}
			isProcessing={loading}
			color="dark"
			title="Select a currency"
		>
			{currencies?.map((currency) => (
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
