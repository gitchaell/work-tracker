import { Currency } from '@/core/currency/domain/Currency.model';
import { CurrencyIcon } from '@/core/currency/presentation/components/CurrencyIcon.component';

export const CurrencyItem = ({ currency }: { currency: Currency }) => {
	return (
		<>
			<CurrencyIcon code={currency.code.get()} />
			<h5 className="text-md font-regular self-center text-gray-900 dark:text-white">
				{currency.code.get()}
			</h5>
		</>
	);
};
