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

export class GeolocationAPI {
	static API_URL = 'https://nominatim.openstreetmap.org/reverse';

	static async getUserCountry(): Promise<string | null> {
		try {
			const { coords } = await GeolocationAPI.getUserCoords();

			return fetch(
				`${GeolocationAPI.API_URL}?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
			)
				.then((response) => response.json())
				.then((data: APIResponse) => data.address.country);
		} catch (error) {
			console.error('Error getting user country');
			return null;
		}
	}

	static getUserCoords(): Promise<GeolocationPosition> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			});
		});
	}
}
