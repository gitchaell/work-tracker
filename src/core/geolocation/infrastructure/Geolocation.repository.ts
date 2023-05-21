import { DatabaseStorage } from '@/core/common/helpers/DatabaseStorage.helper';
import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';

export const GeolocationRepository = DatabaseStorage.getCollection<Geolocation>('Geolocation');
