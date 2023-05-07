import { SingleRepository } from '../base/single.repository';
import { WorkProfile } from './work-profile.entity';

class _WorkProfileRepository extends SingleRepository<WorkProfile> {}

export const WorkProfileRepository = new _WorkProfileRepository('WorkProfile');
