import { DatabaseStorage } from '@/core/common/helpers/DatabaseStorage.helper';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';

export const GeolocationRepository = DatabaseStorage.getCollection<GeolocationEntity>('Geolocation');
