import { DatabaseStorage } from '@/core/common/helpers/DatabaseStorage.helper';
import { Task } from '@/core/task/domain/Task.entity';

export const TaskRepository = DatabaseStorage.getCollection<Task>('Tasks');
