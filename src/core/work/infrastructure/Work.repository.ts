import { DatabaseStorage } from '@/core/common/helpers/DatabaseStorage.helper';
import { Work } from '@/core/work/domain/Work.entity';

export const WorkRepository = DatabaseStorage.getCollection<Work>('Works');
