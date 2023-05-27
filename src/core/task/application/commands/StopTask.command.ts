import { Response } from '@/core/common/interfaces/Response.interface';
import { Task } from '@/core/task/domain/Task.entity';
import { TaskTimer } from '@/core/task/application/workers/TaskTimer.worker';

export class StopTaskCommand {
	static execute(task: Task): Response<Task> {
		TaskTimer.stop({ task });

		return { data: task };
	}
}
