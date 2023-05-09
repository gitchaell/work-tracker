import { SingleRepository } from '@/base';
import { Currency } from '.';

class _CurrencyRepository extends SingleRepository<Currency> {}

export const CurrencyRepository = new _CurrencyRepository('Currency');
