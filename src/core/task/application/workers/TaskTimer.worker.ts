import { Task } from '@/core/task/domain/Task.entity';
import { Work } from '@/core/work/domain/Work.entity';

export interface CreateTaskTimingDTO {
	task: Task;
	work: Work;
	onStart: (task: Task) => void;
	onTick: (task: Task) => void;
	onStop: (task: Task) => void;
}

export class TaskTiming {
	task: Task;
	work: Work;
	onStart: (task: Task) => void;
	onTick: (task: Task) => void;
	onStop: (task: Task) => void;

	private intervalId!: number;

	constructor({ task, work, onStart, onTick, onStop }: CreateTaskTimingDTO) {
		this.task = task;
		this.work = work;
		this.onStart = onStart;
		this.onTick = onTick;
		this.onStop = onStop;
	}

	start(): void {
		this.task.status = 'running';
		this.onStart(this.task);

		this.intervalId = window.setInterval(() => {
			this.task.totalSeconds += 1;
			this.task.totalAmount += this.work.rate.perSecond;

			this.onTick(this.task);
		}, 1000);
	}

	stop(): void {
		window.clearInterval(this.intervalId);
		this.task.status = 'paused';
		this.onStop(this.task);
	}
}

export class TaskTimer {
	static timers: Record<string, TaskTiming> = {};

	static start({ task, work, onStart, onTick, onStop }: CreateTaskTimingDTO) {
		this.timers[task.id] = new TaskTiming({ task, work, onStart, onTick, onStop });
		this.timers[task.id].start();
	}

	static stop({ task }: { task: Task }) {
		this.timers[task.id].stop();
		delete this.timers[task.id];
	}
}
