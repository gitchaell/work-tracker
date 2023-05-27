import { FindTasksQuery } from '@/core/task/application/queries/FindTasks.query';
import { CreateTaskCommand } from '@/core/task/application/commands/CreateTask.command';
import { UpdateTaskCommand } from '@/core/task/application/commands/UpdateTask.command';
import { DeleteTaskCommand } from '@/core/task/application/commands/DeleteTask.command';
import { StartTaskCommand } from '@/core/task/application/commands/StartTask.command';
import { StopTaskCommand } from '@/core/task/application/commands/StopTask.command';

export class TaskService {
	static findTasks = FindTasksQuery.execute;
	static createTask = CreateTaskCommand.execute;
	static updateTask = UpdateTaskCommand.execute;
	static deleteTask = DeleteTaskCommand.execute;
	static startTask = StartTaskCommand.execute;
	static stopTask = StopTaskCommand.execute;
}
