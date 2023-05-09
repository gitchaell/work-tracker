import { Currency, CurrencyIcon } from '.';

export const CurrencyItem = ({ currency }: { currency: Currency }) => {
	return (
		<>
			<CurrencyIcon code={currency.code} />
			<h5 className="text-md font-regular self-center text-gray-900 dark:text-white">
				{currency.code}
			</h5>
		</>
	);
};
