import { FindGeolocationQuery } from '@/core/geolocation/application/queries/FindGeolocation.query';
import { SaveGeolocationCommand } from '@/core/geolocation/application/commands/SaveGeolocation.command';

export class GeolocationService {
	static findGeolocation = FindGeolocationQuery.execute;
	static saveGeolocation = SaveGeolocationCommand.execute;
}
