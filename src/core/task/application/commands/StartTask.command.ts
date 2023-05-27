import { Response } from '@/core/common/interfaces/Response.interface';
import { Task } from '@/core/task/domain/Task.entity';
import { Work } from '@/core/work/domain/Work.entity';
import { TaskTimer } from '@/core/task/application/workers/TaskTimer.worker';
import { TaskTimedEvent } from '@/core/task/application/events/TaskTimed.event';

export class StartTaskCommand {
	static execute(task: Task, work: Work): Response<Task> {
		TaskTimer.start({
			task,
			work,
			onStart: (task) => {
				TaskTimedEvent.publish({ task });
			},
			onTick: (task) => {
				TaskTimedEvent.publish({ task });
			},
			onStop: (task) => {
				TaskTimedEvent.publish({ task });
			},
		});

		return { data: task };
	}
}
