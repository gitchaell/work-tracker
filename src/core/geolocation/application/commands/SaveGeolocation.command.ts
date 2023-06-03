import { GeolocationRepository } from '@/core/geolocation/infrastructure/Geolocation.repository';
import { GeolocationSavedEvent } from '@/core/geolocation/application/events/GeolocationSaved.event';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';

export class SaveGeolocationCommand {
	static execute(geolocation: GeolocationEntity): GeolocationEntity {
		const geolocationSaved = geolocation.id
			? GeolocationRepository.update(geolocation)
			: GeolocationRepository.create(geolocation);

		GeolocationSavedEvent.publish({ geolocation: geolocationSaved });

		return geolocationSaved;
	}
}
