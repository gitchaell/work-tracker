import { AppProvider } from '@/App.context';
import { HomePage } from '@/routes/home/Home.page';
import { CurrencyProvider } from '@/core/currency/presentation/context/Currency.provider';

export const App = () => {
	return (
		<AppProvider>
			<CurrencyProvider>
				<HomePage />
			</CurrencyProvider>
		</AppProvider>
	);
};
