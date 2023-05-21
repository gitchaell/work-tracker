import { DefaultGeolocationDTO } from '@/core/geolocation/domain/Geolocation.dto';

export class GeolocationAPI {
	static async getGeolocation(): Promise<DefaultGeolocationDTO> {
		const { coords } = await NavigatorGeolocationAPI.getCoords();

		const response = await OpenStreetMapAPI.request(coords.latitude, coords.longitude);

		return {
			state: response.address.state,
			country: response.address.country,
			city: response.address.city,
			address: response.display_name,
			latitude: coords.latitude,
			longitude: coords.longitude,
			countryCode: response.address.country_code,
		};
	}
}

export interface NavigatorGeolocationAPIResponse {
	coords: {
		latitude: number;
		longitude: number;
	};
}

export class NavigatorGeolocationAPI {
	static getCoords(): Promise<NavigatorGeolocationAPIResponse> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			});
		});
	}
}

export interface OpenStreetMapAPIResponse {
	place_id: number;
	lat: string;
	lon: string;
	display_name: string;
	address: {
		office: string;
		road: string;
		city: string;
		county: string;
		state: string;
		country: string;
		country_code: string;
	};
}

export class OpenStreetMapAPI {
	static URL = 'https://nominatim.openstreetmap.org/reverse';

	static async request(latitude: number, longitude: number): Promise<OpenStreetMapAPIResponse> {
		return fetch(`${OpenStreetMapAPI.URL}?format=json&lat=${latitude}&lon=${longitude}`).then((response) =>
			response.json()
		);
	}
}
