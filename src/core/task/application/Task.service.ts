import { FindTasksQuery } from '@/core/task/application/queries/FindTasks.query';
import { CreateTaskCommand } from '@/core/task/application/commands/CreateTask.command';
import { UpdateTaskCommand } from '@/core/task/application/commands/UpdateTask.command';
import { DeleteTaskCommand } from '@/core/task/application/commands/DeleteTask.command';
import { TimeTaskCommand } from '@/core/task/application/commands/TimeTask.command';

export class TaskService {
	static findTasks = FindTasksQuery.execute;
	static createTask = CreateTaskCommand.execute;
	static updateTask = UpdateTaskCommand.execute;
	static deleteTask = DeleteTaskCommand.execute;
	static startTask = TimeTaskCommand.startTask;
	static stopTask = TimeTaskCommand.stopTask;
}
