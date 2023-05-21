export interface DefaultGeolocationDTO {
	countryCode: string;
	country: string;
	state: string;
	city: string;
	latitude: number;
	longitude: number;
	address: string;
}
export interface SaveGeolocationDTO {
	id?: string;
	countryCode: string;
	country: string;
	state: string;
	city: string;
	latitude: number;
	longitude: number;
	address: string;
}
