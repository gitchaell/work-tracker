export interface DefaultGeolocationDTO {
	country: string;
	state: string;
	city: string;
	latitude: number;
	longitude: number;
	address: string;
}
export interface SaveGeolocationDTO {
	id?: string;
	country: string;
	state: string;
	city: string;
	latitude: number;
	longitude: number;
	address: string;
}
