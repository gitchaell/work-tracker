import { useContext } from 'react';
import { Avatar } from 'flowbite-react';

import { AppContext } from '@/App.context';
import { CurrencyTab } from '@/core/currency/presentation/components/CurrencyTab.component';
import { WorkTab } from '@/core/work/presentation/components/WorkTab.component';
import { WorkRateCard } from '@/core/work/presentation/components/WorkRateCard.component';
import { TaskTab } from '@/core/task/presentation/components/TaskTab.component';

export const HomePage = () => {
	const { version, author, year } = useContext(AppContext);

	return (
		<>
			<header className="flex items-center justify-between gap-2 p-2">
				<CurrencyTab />
				<WorkTab />
			</header>

			<main className="flex h-full flex-col gap-2 p-2">
				<WorkRateCard />
				<TaskTab />
			</main>

			<footer className="flex items-center justify-center gap-2 bg-gray-900 px-2 py-8 text-white">
				<Avatar img="https://avatars.githubusercontent.com/u/37460957?s=40&v=4" rounded={true}>
					<div className="space-y-1 font-medium dark:text-white">
						<div>{author}</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							v{version} - {year}
						</div>
					</div>
				</Avatar>
			</footer>
		</>
	);
};
