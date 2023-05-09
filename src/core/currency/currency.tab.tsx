import { Dropdown } from 'flowbite-react';
import { useContext } from 'react';
import { CurrencyIcon, CurrencyItem } from '.';
import { AppContext } from '@/app/App.context';

export const CurrencyTab = () => {
	const { currency, currencies, selectCurrency, loading } =
		useContext(AppContext);

	return (
		<Dropdown
			label={!loading && <CurrencyIcon code={currency?.code || 'USD'} />}
			isProcessing={loading}
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
