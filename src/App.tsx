import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from '@/App.context';
import { GeolocationProvider } from '@/core/geolocation/presentation/context/Geolocation.provider';
import { CurrencyProvider } from '@/core/currency/presentation/context/Currency.provider';
import { WorkProvider } from './core/work/presentation/context/Work.provider';

import { Router } from '@/routes/Router';
import { TaskProvider } from './core/task/presentation/context/Task.provider';

export const App = () => {
	return (
		<AppProvider>
			<GeolocationProvider>
				<CurrencyProvider>
					<WorkProvider>
						<TaskProvider>
							<BrowserRouter>
								<Router />
							</BrowserRouter>
						</TaskProvider>
					</WorkProvider>
				</CurrencyProvider>
			</GeolocationProvider>
		</AppProvider>
	);
};
