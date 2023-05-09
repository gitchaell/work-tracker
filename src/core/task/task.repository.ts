import { Task } from '.';
import { MultiRepository } from '@/base';

class _TasksRepository extends MultiRepository<Task> {}

export const TasksRepository = new _TasksRepository('Tasks');
