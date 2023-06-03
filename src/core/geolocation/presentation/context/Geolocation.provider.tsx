import { useCallback, useReducer } from 'react';

import { GeolocationService } from '@/core/geolocation/application/Geolocation.service';
import { GeolocationState } from '@/core/geolocation/presentation/state/Geolocation.state';
import { GeolocationContext } from '@/core/geolocation/presentation/context/Geolocation.context';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';
import { GeolocationMapper } from '@/core/geolocation/infrastructure/Geolocation.mapper';
import { Geolocation } from '@/core/geolocation/domain/Geolocation.model';

export const GeolocationProvider = ({ children }: { children: JSX.Element }) => {
	const [{ geolocationSaved }, dispatch] = useReducer(
		GeolocationState.reducer,
		GeolocationState.initialState,
		GeolocationState.initializer
	);

	const findGeolocation = useCallback(() => {
		const geolocation = GeolocationService.findGeolocation();
		return geolocation ? GeolocationMapper.toModel(geolocation) : null;
	}, []);

	const fetchGeolocation = useCallback(
		() => GeolocationService.fetchGeolocation().then((geolocation) => GeolocationMapper.toModel(geolocation)),
		[]
	);

	const saveGeolocation = useCallback((geolocation: Geolocation | GeolocationEntity) => {
		if (geolocation instanceof Geolocation) {
			geolocation = GeolocationMapper.toEntity(geolocation);
		}

		const geolocationSaved = GeolocationService.saveGeolocation(geolocation);
		dispatch({ type: 'geolocation/saved', payload: geolocationSaved });
		return GeolocationMapper.toModel(geolocationSaved);
	}, []);

	return (
		<GeolocationContext.Provider
			value={{
				geolocationSaved: geolocationSaved ? GeolocationMapper.toModel(geolocationSaved) : null,
				findGeolocation,
				fetchGeolocation,
				saveGeolocation,
			}}
		>
			{children}
		</GeolocationContext.Provider>
	);
};
