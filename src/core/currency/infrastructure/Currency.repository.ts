import { DatabaseStorage } from '@/core/common/helpers/DatabaseStorage.helper';
import { CurrencyEntity } from '@/core/currency/domain/entities/Currency.entity';
import { CurrencyMock } from './Currency.mock';

export const CurrencyRepository = DatabaseStorage.getCollection<CurrencyEntity>('Currencies', CurrencyMock);
