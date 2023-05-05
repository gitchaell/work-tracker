import BaseRepository from '../base/base.repository';
import HourlyRateEntity from './hourly-rate.entity';

class HourlyRateRepository extends BaseRepository<HourlyRateEntity> {}

export default HourlyRateRepository.getInstance(
	'HourlyRates'
) as BaseRepository<HourlyRateEntity>;
