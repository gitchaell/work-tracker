import { Geolocation } from '@/core/geolocation/domain/Geolocation.model';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';

export class GeolocationMapper {
	static toEntity(geolocation: Geolocation): GeolocationEntity {
		return {
			id: geolocation.id.get(),
			country: geolocation.country.get(),
			state: geolocation.state.get(),
			city: geolocation.city.get(),
			address: geolocation.address.get(),
			latitude: geolocation.latitude.get(),
			longitude: geolocation.longitude.get(),
		};
	}

	static toModel(geolocationEntity: GeolocationEntity): Geolocation {
		const geolocation = new Geolocation();

		geolocation.id.set(geolocationEntity.id);
		geolocation.country.set(geolocationEntity.country);
		geolocation.state.set(geolocationEntity.state);
		geolocation.city.set(geolocationEntity.city);
		geolocation.address.set(geolocationEntity.address);
		geolocation.latitude.set(geolocationEntity.latitude);
		geolocation.longitude.set(geolocationEntity.longitude);

		return geolocation;
	}
}
