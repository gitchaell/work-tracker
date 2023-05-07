import { useContext, useEffect, useState } from 'react';
import { WorkProfile, WorkRate } from '../work-profile/work-profile.entity';
import { AppContext } from '../../App.context';
import { HiCheckCircle } from '@react-icons/all-files/hi/HiCheckCircle';
import { CurrencyFormatter } from '../currency/currency.formatter';

export const WorkRateCard = () => {
	const { currency } = useContext(AppContext);
	const [workRate, setWorkRate] = useState<WorkRate>({} as WorkRate);

	useEffect(() => {
		const workProfile = new WorkProfile({
			title: 'InStrategy',
			minSalary: 2250,
			experience: '4-5',
			marketDemand: 'Normal',
			indirectCostsMonthly: 1300,
			profitMargin: 0,
			workHoursPerDay: 8,
			workDaysPerWeek: 5,
			currencyId: currency?.id,
		});

		setWorkRate(workProfile.rate);
	}, []);

	return (
		<div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
			<div className="flex h-full flex-col justify-center gap-4 p-4">
				<div className="flex items-baseline gap-1 text-gray-900 dark:text-white">
					<span className="text-2xl font-extrabold tracking-tight">
						{CurrencyFormatter.format(workRate.perYear, currency)}
					</span>
					<span className="text-xl font-normal text-gray-500 dark:text-gray-400">
						/ year
					</span>
				</div>
				<ul role="list" className="space-y-3">
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{CurrencyFormatter.format(workRate.perMonth, currency)} / month
						</span>
					</li>
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{CurrencyFormatter.format(workRate.perWeek, currency)} / week
						</span>
					</li>
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{CurrencyFormatter.format(workRate.perDay, currency)} / day
						</span>
					</li>
					<li className="flex space-x-3">
						<HiCheckCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-500" />
						<span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
							{CurrencyFormatter.format(workRate.perHour, currency)} / hour
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};
