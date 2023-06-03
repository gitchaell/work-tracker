import { useContext } from 'react';
import { HiCheckCircle } from '@react-icons/all-files/hi/HiCheckCircle';

import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';
import { WorkContext } from '@/core/work/presentation/context/Work.context';

export const WorkRateCard = () => {
	const { currencySelected } = useContext(CurrencyContext);
	const { workSelected } = useContext(WorkContext);

	if (!currencySelected || !workSelected) {
		return null;
	}

	return (
		<section className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
			<div className="flex h-full flex-col justify-center gap-4 p-4">
				<div className="flex items-baseline gap-1 text-gray-900 dark:text-white">
					<span className="text-2xl font-extrabold tracking-tight">
						{currencySelected.format(workSelected.rate.perYear.get())}
					</span>
					<span className="text-xl font-normal text-gray-500 dark:text-gray-400">/ year</span>
				</div>
				<ul role="list" className="space-y-3">
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{currencySelected.format(workSelected.rate.perMonth.get())}/ month
						</span>
					</li>
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{currencySelected.format(workSelected.rate.perWeek.get())}/ week
						</span>
					</li>
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{currencySelected.format(workSelected.rate.perDay.get())}/ day
						</span>
					</li>
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{currencySelected.format(workSelected.rate.perHour.get())}/ hour
						</span>
					</li>
				</ul>
			</div>
		</section>
	);
};
