import { createContext } from 'react';

import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';
import { DefaultGeolocationDTO } from '@/core/geolocation/domain/Geolocation.dto';

interface GeolocationContextProps {
	geolocationSaved: Geolocation | null;
	findGeolocation: () => Geolocation | null;
	fetchGeolocation: () => Promise<DefaultGeolocationDTO>;
	saveGeolocation: (geolocation: Geolocation) => void;
}

export const GeolocationContext = createContext<GeolocationContextProps>({
	geolocationSaved: null,
	findGeolocation: () => {
		throw new Error('findGeolocation() method not implemented.');
	},
	fetchGeolocation: () => {
		throw new Error('fetchGeolocation() method not implemented.');
	},
	saveGeolocation: () => {
		throw new Error('saveGeolocation() method not implemented.');
	},
});
