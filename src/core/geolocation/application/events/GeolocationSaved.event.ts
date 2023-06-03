import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';

export type GeolocationSavedEventDetail = { geolocation: GeolocationEntity };
export type GeolocationSavedEventListener = (event: CustomEvent<GeolocationSavedEventDetail>) => void;

export class GeolocationSavedEvent {
	static eventName = 'geolocation/saved';

	static publish(detail: GeolocationSavedEventDetail) {
		EventStorage.save({ name: this.eventName, detail });

		document.dispatchEvent(new CustomEvent(this.eventName, { detail }));
	}

	static subscribe(handler: GeolocationSavedEventListener) {
		document.addEventListener(this.eventName, handler as EventListener);
	}

	static unsubscribe(handler: GeolocationSavedEventListener) {
		document.removeEventListener(this.eventName, handler as EventListener);
	}
}
