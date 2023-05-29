import { DatabaseStorage } from '@/core/common/helpers/DatabaseStorage.helper';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';

export const TaskRepository = DatabaseStorage.getCollection<TaskEntity>('Tasks');
