import { useContext } from 'react';
import { AppContext } from '@/App.context';
import { CurrencyTab } from '@/core/currency/presentation/components/CurrencyTab.component';

export const HomePage = () => {
	const { version, author, year } = useContext(AppContext);

	return (
		<>
			<header className="flex items-center justify-between gap-2">
				<CurrencyTab />
				{/* <WorkProfileTab /> */}
			</header>
			<main className="flex h-full flex-col gap-2 p-2"></main>
			<footer className="flex items-center justify-between gap-2 bg-gray-800 text-white">
				{version} - {author} - {year}
			</footer>
		</>
	);
};
