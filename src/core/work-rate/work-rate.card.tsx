import { useContext, useEffect } from 'react';
import { HiCheckCircle } from '@react-icons/all-files/hi/HiCheckCircle';
import { CurrencyFormatter } from '@/currency';
import { AppContext } from '@/app/App.context';

export const WorkRateCard = () => {
	const { currency, workProfile } = useContext(AppContext);

	useEffect(() => {
		console.count('WorkRateCard - Refresh');
	}, [workProfile]);

	return (
		<section className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
			<div className="flex h-full flex-col justify-center gap-4 p-4">
				<div className="flex items-baseline gap-1 text-gray-900 dark:text-white">
					<span className="text-2xl font-extrabold tracking-tight">
						{CurrencyFormatter.format(workProfile?.rate.perYear || 0, currency)}
					</span>
					<span className="text-xl font-normal text-gray-500 dark:text-gray-400">
						/ year
					</span>
				</div>
				<ul role="list" className="space-y-3">
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{CurrencyFormatter.format(
								workProfile?.rate.perMonth || 0,
								currency
							)}
							/ month
						</span>
					</li>
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{CurrencyFormatter.format(
								workProfile?.rate.perWeek || 0,
								currency
							)}
							/ week
						</span>
					</li>
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{CurrencyFormatter.format(
								workProfile?.rate.perDay || 0,
								currency
							)}
							/ day
						</span>
					</li>
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{CurrencyFormatter.format(
								workProfile?.rate.perHour || 0,
								currency
							)}
							/ hour
						</span>
					</li>
				</ul>
			</div>
		</section>
	);
};
