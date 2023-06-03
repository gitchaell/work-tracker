import { createContext } from 'react';

import { NotImplementedError } from '@/core/common/helpers/ErrorHandlers.helper';
import { Geolocation } from '@/core/geolocation/domain/Geolocation.model';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';

interface GeolocationContextProps {
	geolocationSaved: Geolocation | null;
	findGeolocation: () => Geolocation | null;
	fetchGeolocation: () => Promise<Geolocation>;
	saveGeolocation: (geolocation: Geolocation | GeolocationEntity) => Geolocation;
}

export const GeolocationContext = createContext<GeolocationContextProps>({
	geolocationSaved: null,
	findGeolocation: () => {
		throw new NotImplementedError('findGeolocation() method not implemented.');
	},
	fetchGeolocation: () => {
		throw new NotImplementedError('fetchGeolocation() method not implemented.');
	},
	saveGeolocation: () => {
		throw new NotImplementedError('saveGeolocation() method not implemented.');
	},
});
