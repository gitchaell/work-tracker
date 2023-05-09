import { CurrencyTab } from '@/currency';
import { WorkProfileTab } from '@/work-profile';
import { WorkRateCard } from '@/work-rate';
import { TaskTab } from '@/task';
import { WorkProfileForm } from '@/work-profile';
import { AppContext } from './App.context';
import { useContext, useEffect } from 'react';

export const App = () => {
	const { workProfile, workProfileFormIsVisible } = useContext(AppContext);

	useEffect(() => {
		console.count('App - Refresh');
	}, [workProfileFormIsVisible]);

	return (
		<main className="flex h-full flex-col gap-2 p-2">
			{workProfileFormIsVisible ? (
				<WorkProfileForm />
			) : (
				<>
					<header className="flex items-center justify-between gap-2">
						<CurrencyTab />
						<WorkProfileTab />
					</header>
					{workProfile ? (
						<>
							<WorkRateCard />
							<TaskTab />
						</>
					) : (
						<div className="p-4 text-center text-xl text-white">
							Nothing here
						</div>
					)}
				</>
			)}
		</main>
	);
};
