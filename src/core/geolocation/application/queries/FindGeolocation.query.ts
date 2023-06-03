import { GeolocationRepository } from '@/core/geolocation/infrastructure/Geolocation.repository';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';

export class FindGeolocationQuery {
	static execute(): GeolocationEntity | null {
		const geolocationEntities = GeolocationRepository.findAll();

		return geolocationEntities.at(0) || null;
	}
}
