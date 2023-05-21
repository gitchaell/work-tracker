import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from '@/App.context';
import { GeolocationProvider } from '@/core/geolocation/presentation/context/Geolocation.provider';
import { CurrencyProvider } from '@/core/currency/presentation/context/Currency.provider';
import { Router } from '@/routes/Router';

export const App = () => {
	return (
		<AppProvider>
			<GeolocationProvider>
				<CurrencyProvider>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</CurrencyProvider>
			</GeolocationProvider>
		</AppProvider>
	);
};
