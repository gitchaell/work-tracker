import { SaveGeolocationDTO } from '@/core/geolocation/domain/Geolocation.dto';
import { GeolocationRepository } from '@/core/geolocation/infrastructure/Geolocation.repository';
import { GeolocationMapper } from '@/core/geolocation/application/helpers/GeolocationMapper.helper';
import { GeolocationSavedEvent } from '@/core/geolocation/application/events/CurrencyCreated.event';
import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';

export class SaveGeolocationCommand {
	static execute(geolocation: SaveGeolocationDTO): Geolocation {
		const geolocationData = GeolocationMapper.toGeolocation(geolocation);
		let geolocationSaved = null;

		if (geolocationData.id) {
			geolocationSaved = GeolocationRepository.update(geolocationData);
		} else {
			geolocationSaved = GeolocationRepository.create(geolocationData);
		}

		if (!geolocationSaved) {
			throw new Error('Geolocation not saved');
		}

		GeolocationSavedEvent.publish({ geolocation: geolocationSaved });

		return geolocationSaved;
	}
}
