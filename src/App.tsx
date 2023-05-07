// import { useContext } from 'react';
import { CurrencyTab } from './core/currency/currency.tab';
import { WorkProfileTab } from './core/work-profile/work-profile.tab';
import { WorkRateCard } from './core/work-rate/work-rate.card';
// import { AppContext } from './App.context';
import { TaskTab } from './core/task/task.tab';
import { WorkProfileForm } from './core/work-profile/work-profile.form';

export const App = () => {
	// const { loading } = useContext(AppContext);

	return (
		<main className="flex h-full flex-col gap-2">
			<header className="flex items-center justify-between gap-2">
				<CurrencyTab />
				<WorkProfileTab />
			</header>

			<WorkProfileForm />

			<section>
				<WorkRateCard />
			</section>
			<section>
				<TaskTab />
			</section>
		</main>
	);
};
