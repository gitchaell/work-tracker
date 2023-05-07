import { SingleRepository } from '../base/single.repository';
import { Geolocation } from './geolocation.entity';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://nominatim.openstreetmap.org/reverse';

export interface APIResponse {
	place_id: number;
	lat: string;
	lon: string;
	display_name: string;
	address: APIAddress;
}

export interface APIAddress {
	office: string;
	road: string;
	city: string;
	county: string;
	state: string;
	country: string;
	country_code: string;
}

class _GeolocationRepository extends SingleRepository<Geolocation> {
	async search(): Promise<Geolocation> {
		const geolocationStored = this.get();

		if (geolocationStored) {
			return Promise.resolve(geolocationStored);
		}

		const defaultGeolocation = {
			id: uuidv4(),
			country: 'United States',
			countryCode: 'US',
		} as Geolocation;

		return new Promise<{ coords: { latitude: number; longitude: number } }>(
			(resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				});
			}
		)
			.then(({ coords }) =>
				fetch(
					`${API_URL}?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
				)
					.then((response) => response.json())
					.then((response: APIResponse) => ({
						id: uuidv4(),
						placeId: response.place_id,
						latitude: coords.latitude,
						longitude: coords.longitude,
						name: response.display_name,
						office: response.address.office,
						road: response.address.road,
						city: response.address.city,
						county: response.address.county,
						state: response.address.state,
						country: response.address.country,
						countryCode: response.address.country_code,
					}))
					.catch(() => defaultGeolocation)
			)
			.catch(() => defaultGeolocation);
	}
}

export const GeolocationRepository = new _GeolocationRepository('Geolocation');
