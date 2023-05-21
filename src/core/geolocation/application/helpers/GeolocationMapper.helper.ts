import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';

export class GeolocationMapper {
	static toGeolocation(geolocationDTO: Partial<Geolocation>): Geolocation {
		return {
			id: geolocationDTO.id,
			state: geolocationDTO.state,
			country: geolocationDTO.country,
			city: geolocationDTO.city,
			latitude: geolocationDTO.latitude,
			longitude: geolocationDTO.longitude,
			address: geolocationDTO.address,
			countryCode: geolocationDTO.countryCode,
		} as Geolocation;
	}
}
