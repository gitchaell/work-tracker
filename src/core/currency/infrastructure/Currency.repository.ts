import { DatabaseStorage } from '@/core/common/helpers/DatabaseStorage.helper';
import { Currency } from '@/core/currency/domain/Currency.entity';
import { CurrencyMock } from './Currency.mock';

export const CurrencyRepository = DatabaseStorage.getCollection<Currency>('Currencies', CurrencyMock);
