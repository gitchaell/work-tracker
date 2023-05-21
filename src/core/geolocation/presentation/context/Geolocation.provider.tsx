import { useCallback, useReducer } from 'react';

import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';
import { GeolocationService } from '@/core/geolocation/application/Geolocation.service';
import {
	GeolocationInitialState,
	GeolocationReducer,
	GeolocationStateInitializer,
} from '@/core/geolocation/presentation/state/Geolocation.state';
import { GeolocationContext } from '@/core/geolocation/presentation/context/Geolocation.context';
import { GeolocationAPI } from '../../infrastructure/Geolocation.api';

export const GeolocationProvider = ({ children }: { children: JSX.Element }) => {
	const [{ geolocationSaved }, dispatch] = useReducer(
		GeolocationReducer,
		GeolocationInitialState,
		GeolocationStateInitializer
	);

	const findGeolocation = useCallback(() => GeolocationService.findGeolocation(), []);

	const fetchGeolocation = useCallback(() => GeolocationAPI.getGeolocation(), []);

	const saveGeolocation = useCallback((geolocation: Geolocation) => {
		const geolocationSaved = GeolocationService.saveGeolocation(geolocation);
		dispatch({ type: 'geolocation/saved', payload: geolocationSaved });
	}, []);

	return (
		<GeolocationContext.Provider
			value={{
				geolocationSaved,
				findGeolocation,
				fetchGeolocation,
				saveGeolocation,
			}}
		>
			{children}
		</GeolocationContext.Provider>
	);
};
