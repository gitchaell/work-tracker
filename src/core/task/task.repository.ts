import BaseRepository from '../base/base.repository';
import { Task } from './task.entity';

class TaskRateRepository extends BaseRepository<Task> {}

export default TaskRateRepository.getInstance('Tasks') as BaseRepository<Task>;
