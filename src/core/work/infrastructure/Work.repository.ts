import { DatabaseStorage } from '@/core/common/helpers/DatabaseStorage.helper';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';

export const WorkRepository = DatabaseStorage.getCollection<WorkEntity>('Works');
