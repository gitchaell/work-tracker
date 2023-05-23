import { SaveGeolocationDTO } from '@/core/geolocation/domain/Geolocation.dto';
import { GeolocationRepository } from '@/core/geolocation/infrastructure/Geolocation.repository';
import { GeolocationMapper } from '@/core/geolocation/application/helpers/GeolocationMapper.helper';
import { GeolocationSavedEvent } from '@/core/geolocation/application/events/GeolocationSaved.event';
import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';

export class SaveGeolocationCommand {
	static execute(geolocation: SaveGeolocationDTO): Geolocation {
		const geolocationData = GeolocationMapper.toGeolocation(geolocation);

		const geolocationSaved = geolocationData.id
			? GeolocationRepository.update(geolocationData)
			: GeolocationRepository.create(geolocationData);

		GeolocationSavedEvent.publish({ geolocation: geolocationSaved });

		return geolocationSaved;
	}
}
