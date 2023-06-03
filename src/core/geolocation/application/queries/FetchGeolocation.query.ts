import { UUID } from '@/core/common/helpers/UUID.helper';
import { NavigatorGeolocationAPI, OpenStreetMapAPI } from '@/core/geolocation/infrastructure/Geolocation.api';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';

export class FetchGeolocationQuery {
	static async execute(): Promise<GeolocationEntity> {
		const coords = await NavigatorGeolocationAPI.getCoords();

		const geolocation = await OpenStreetMapAPI.request(coords.latitude, coords.longitude);

		return {
			id: UUID(),
			country: geolocation.address.country,
			state: geolocation.address.state,
			city: geolocation.address.city,
			address: geolocation.display_name,
			latitude: coords.latitude,
			longitude: coords.longitude,
		};
	}
}
