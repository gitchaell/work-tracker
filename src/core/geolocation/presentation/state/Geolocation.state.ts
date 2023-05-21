import { StateStorage } from '@/core/common/helpers/StateStorage.helper';
import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';

export interface GeolocationState {
	geolocationSaved: Geolocation | null;
}

export type GeolocationAction = { type: 'geolocation/saved'; payload: Geolocation };

export type GeolocationActionType = 'geolocation/saved';
export type GeolocationActionPayload = Geolocation | null;

export const GeolocationReducer = (state: GeolocationState, action: GeolocationAction): GeolocationState => {
	StateStorage.save<GeolocationActionType, GeolocationActionPayload>(action);

	if (action.type === 'geolocation/saved') {
		return { ...state, geolocationSaved: action.payload };
	}

	return state;
};

export const GeolocationInitialState: GeolocationState = {
	geolocationSaved: null,
};

export const GeolocationStateInitializer = (state: GeolocationState) => {
	const geolocationState = StateStorage.value<GeolocationActionType, GeolocationActionPayload>();
	const geolocationSaved = geolocationState.get('geolocation/saved') || null;

	return {
		...state,
		geolocationSaved,
	};
};
