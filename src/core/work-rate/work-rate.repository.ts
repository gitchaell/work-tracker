import BaseRepository from '../base/base.repository';
import { WorkRate } from './work-rate.entity';

class WorkRateRepository extends BaseRepository<WorkRate> {}

export default WorkRateRepository.getInstance(
	'WorkRates'
) as BaseRepository<WorkRate>;
