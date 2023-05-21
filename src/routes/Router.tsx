import { Routes, Route, Navigate } from 'react-router-dom';

import { CheckInGuard } from '@/routes/Guards';

import { HomePage } from './home/Home.page';
import { GeolocationFormPage } from './geolocation/form/GeolocationForm.page';
import { WorkFormPage } from './work/form/WorkForm.page';
import { NotFoundPage } from './*/NotFound.page';

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/home" replace />} />
			<Route
				path="/home"
				element={
					<CheckInGuard>
						<HomePage />
					</CheckInGuard>
				}
			/>
			<Route
				path="/work/form"
				element={
					<CheckInGuard>
						<WorkFormPage />
					</CheckInGuard>
				}
			/>
			<Route path="/geolocation/form" element={<GeolocationFormPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};