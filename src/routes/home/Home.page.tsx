import { CurrencyTab } from '@/core/currency/presentation/components/CurrencyTab.component';
import { WorkTab } from '@/core/work/presentation/components/WorkTab.component';
import { WorkRateCard } from '@/core/work/presentation/components/WorkRateCard.component';
import { TaskTab } from '@/core/task/presentation/components/TaskTab.component';

export const HomePage = () => {
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
		</>
	);
};
