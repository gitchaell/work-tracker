import BaseRepository from '../base/base.repository';
import { WorkProfile } from './work-profile.entity';

class WorkProfileRateRepository extends BaseRepository<WorkProfile> {}

export default WorkProfileRateRepository.getInstance(
	'WorkProfiles'
) as BaseRepository<WorkProfile>;
