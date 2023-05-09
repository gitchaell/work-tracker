import { MultiRepository } from '@/base';
import { WorkProfile } from '.';

class _WorkProfilesRepository extends MultiRepository<WorkProfile> {}

export const WorkProfilesRepository = new _WorkProfilesRepository(
	'WorkProfiles'
);
