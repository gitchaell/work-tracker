import { SingleRepository } from '../base/single.repository';
import { Currency } from './currency.entity';

class _CurrencyRepository extends SingleRepository<Currency> {}

export const CurrencyRepository = new _CurrencyRepository('Currency');
