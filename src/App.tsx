import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { AppProvider } from '@/App.context';
import { GeolocationProvider } from '@/core/geolocation/presentation/context/Geolocation.provider';
import { CurrencyProvider } from '@/core/currency/presentation/context/Currency.provider';
import { WorkProvider } from './core/work/presentation/context/Work.provider';
import { TaskProvider } from './core/task/presentation/context/Task.provider';

import { Router } from '@/routes/Router';
import { ErrorPage } from '@/routes/*/Error.page';
import { LoadingPage } from '@/routes/*/Loading.page';

export const App = () => {
	return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<Suspense fallback={<LoadingPage />}>
				<AppProvider>
					<GeolocationProvider>
						<CurrencyProvider>
							<WorkProvider>
								<TaskProvider>
									<BrowserRouter basename="/work-tracker">
										<Router />
									</BrowserRouter>
								</TaskProvider>
							</WorkProvider>
						</CurrencyProvider>
					</GeolocationProvider>
				</AppProvider>
			</Suspense>
		</ErrorBoundary>
	);
};
