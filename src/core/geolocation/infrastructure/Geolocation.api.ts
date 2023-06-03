export interface NavigatorGeolocationAPIResponse {
	latitude: number;
	longitude: number;
}

export class NavigatorGeolocationAPI {
	static getCoords(): Promise<NavigatorGeolocationAPIResponse> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(({ coords }) => resolve(coords), reject, {
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
		const endpoint = `${OpenStreetMapAPI.URL}?format=json&lat=${latitude}&lon=${longitude}`;
		return fetch(endpoint).then((response) => response.json());
	}
}
