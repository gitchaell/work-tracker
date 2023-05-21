import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { GeolocationContext } from '@/core/geolocation/presentation/context/Geolocation.context';

export const CheckInGuard = ({ children }: { children: JSX.Element }) => {
	const { findGeolocation } = useContext(GeolocationContext);
	const location = useLocation();

	if (findGeolocation() === null) {
		return <Navigate to="/geolocation/form" state={{ from: location }} replace />;
	}

	return children;
};
