import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';
import { GeolocationRepository } from '@/core/geolocation/infrastructure/Geolocation.repository';

export class FindGeolocationQuery {
	static execute(): Geolocation | null {
		const allGeolocation = GeolocationRepository.findAll();

		return allGeolocation.at(0) || null;
	}
}
