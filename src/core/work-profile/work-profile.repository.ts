import { SingleRepository } from '@/base';
import { WorkProfile } from '.';

class _WorkProfileRepository extends SingleRepository<WorkProfile> {}

export const WorkProfileRepository = new _WorkProfileRepository('WorkProfile');
