import BaseRepository from '../base/base.repository';
import { Currency } from './currency.entity';

class _CurrencyRepository extends BaseRepository<Currency> {}

const CurrencyRepository = _CurrencyRepository.getInstance(
	'Currencies'
) as BaseRepository<Currency>;

export { CurrencyRepository };
