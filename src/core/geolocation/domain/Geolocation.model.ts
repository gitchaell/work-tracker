import { GeolocationId } from '@/core/geolocation/domain/value-objects/GeolocationId.value';
import { GeolocationCountry } from '@/core/geolocation/domain/value-objects/GeolocationCountry.value';
import { GeolocationState } from '@/core/geolocation/domain/value-objects/GeolocationState.value';
import { GeolocationCity } from '@/core/geolocation/domain/value-objects/GeolocationCity.value';
import { GeolocationAddress } from '@/core/geolocation/domain/value-objects/GeolocationAddress.value';
import { GeolocationLatitude } from '@/core/geolocation/domain/value-objects/GeolocationLatitude.value';
import { GeolocationLongitude } from '@/core/geolocation/domain/value-objects/GeolocationLongitude.value';

export class Geolocation {
	id: GeolocationId;
	country: GeolocationCountry;
	state: GeolocationState;
	city: GeolocationCity;
	address: GeolocationAddress;
	latitude: GeolocationLatitude;
	longitude: GeolocationLongitude;

	constructor() {
		this.id = new GeolocationId();
		this.country = new GeolocationCountry();
		this.state = new GeolocationState();
		this.city = new GeolocationCity();
		this.latitude = new GeolocationLatitude();
		this.longitude = new GeolocationLongitude();
		this.address = new GeolocationAddress();
	}
}
