import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { GeolocationContext } from '@/core/geolocation/presentation/context/Geolocation.context';

export const RequireGeolocationGuard = ({ children }: { children: JSX.Element }) => {
	const { geolocationSaved } = useContext(GeolocationContext);
	const location = useLocation();

	if (!geolocationSaved) {
		return <Navigate to="/geolocation/form" state={{ from: location }} replace />;
	}

	return children;
};
