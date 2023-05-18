import { LocalDatabaseAdapter } from '@/core/common/adapters/LocalDatabase.adapter';

import { Currency } from '@/core/currency/domain/Currency.entity';
import { CurrencyMock } from './Currency.mock';

export const CurrencyRepository = LocalDatabaseAdapter.createCollection<Currency>('Currencies', CurrencyMock);
