import { StateStorage } from '@/core/common/helpers/StateStorage.helper';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';

export interface GeolocationState {
	geolocationSaved: GeolocationEntity | null;
}

export type GeolocationAction = { type: 'geolocation/saved'; payload: GeolocationEntity };

export type GeolocationActionType = 'geolocation/saved';
export type GeolocationActionPayload = GeolocationEntity | null;

const GeolocationReducer = (state: GeolocationState, action: GeolocationAction): GeolocationState => {
	StateStorage.save<GeolocationActionType, GeolocationActionPayload>(action);

	if (action.type === 'geolocation/saved') {
		return { ...state, geolocationSaved: action.payload };
	}

	return state;
};

const GeolocationInitialState: GeolocationState = {
	geolocationSaved: null,
};

const GeolocationStateInitializer = (state: GeolocationState) => {
	const geolocationState = StateStorage.value<GeolocationActionType, GeolocationActionPayload>();
	const geolocationSaved = geolocationState.get('geolocation/saved') || null;

	return {
		...state,
		geolocationSaved,
	};
};

export const GeolocationState = {
	reducer: GeolocationReducer,
	initialState: GeolocationInitialState,
	initializer: GeolocationStateInitializer,
};
