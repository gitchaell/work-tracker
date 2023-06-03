import { Routes, Route } from 'react-router-dom';

import { RequireGeolocationGuard } from '@/routes/Guards';

import { Layout } from '@/routes/Layout';
import { NotFoundPage } from '@/routes/*/NotFound.page';
import { HomePage } from '@/routes/home/Home.page';
import { GeolocationPage } from '@/routes/geolocation/Geolocation.page';
import { GeolocationFormPage } from '@/routes/geolocation/form/GeolocationForm.page';
import { WorkPage } from '@/routes/work/Work.page';
import { WorkFormPage } from '@/routes/work/form/WorkForm.page';
import { TaskFormPage } from '@/routes/task/form/TaskForm.page';
import { TaskPage } from '@/routes/task/Task.page';

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route
					index
					element={
						<RequireGeolocationGuard>
							<HomePage />
						</RequireGeolocationGuard>
					}
				/>

				<Route
					path="work"
					element={
						<RequireGeolocationGuard>
							<WorkPage />
						</RequireGeolocationGuard>
					}
				>
					<Route path="form" element={<WorkFormPage />} />
				</Route>

				<Route
					path="task"
					element={
						<RequireGeolocationGuard>
							<TaskPage />
						</RequireGeolocationGuard>
					}
				>
					<Route path="form" element={<TaskFormPage />} />
				</Route>

				<Route path="geolocation" element={<GeolocationPage />}>
					<Route path="form" element={<GeolocationFormPage />} />
				</Route>
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
