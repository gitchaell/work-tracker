import { FindGeolocationQuery } from '@/core/geolocation/application/queries/FindGeolocation.query';
import { SaveGeolocationCommand } from '@/core/geolocation/application/commands/SaveGeolocation.command';
import { FetchGeolocationQuery } from '@/core/geolocation/application/queries/FetchGeolocation.query';

export class GeolocationService {
	static findGeolocation = FindGeolocationQuery.execute;
	static fetchGeolocation = FetchGeolocationQuery.execute;
	static saveGeolocation = SaveGeolocationCommand.execute;
}
