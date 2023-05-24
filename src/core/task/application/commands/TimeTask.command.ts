import { Task } from '@/core/task/domain/Task.entity';
import { Work } from '@/core/work/domain/Work.entity';
import { TaskTimer } from '@/core/task/application/helpers/TaskTimer.helper';
import { TaskTimedEvent } from '@/core/task/application/events/TaskTimed.event';

export class TimeTaskCommand {
	static timers: Record<string, TaskTimer> = {};

	static start(task: Task, work: Work): void {
		TimeTaskCommand.timers[task.id] = new TaskTimer(task, work);

		TimeTaskCommand.timers[task.id].setTickHandler((task) => {
			TaskTimedEvent.publish({ task });
		});

		TimeTaskCommand.timers[task.id].start();
	}

	static stop(task: Task): void {
		TimeTaskCommand.timers[task.id].stop();
		delete TimeTaskCommand.timers[task.id];
	}
}
