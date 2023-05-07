import { MultiRepository } from '../base/multi.repository copy';
import { WorkProfile } from './work-profile.entity';

class _WorkProfilesRepository extends MultiRepository<WorkProfile> {}

export const WorkProfilesRepository = new _WorkProfilesRepository(
	'WorkProfiles'
);
