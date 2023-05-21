import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';

export class GeolocationSavedEvent {
	static eventName = 'geolocation/saved';

	static publish(detail: { geolocation: Geolocation }) {
		EventStorage.save({ name: this.eventName, detail });
	}
}
