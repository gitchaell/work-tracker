import { Task } from '@/core/task/domain/Task.entity';
import { Work } from '@/core/work/domain/Work.entity';

export class TaskTimer {
	private intervalId!: number;
	private onTick: (task: Task) => void = () => {
		throw new Error('onTick() Method not implemented.');
	};

	constructor(private task: Task, private work: Work) {}

	setTickHandler(onTick: (task: Task) => void): void {
		this.onTick = onTick;
	}

	start(): void {
		this.task.status = 'running';
		this.onTick(this.task);

		this.intervalId = window.setInterval(() => {
			this.task.totalSeconds += 1;
			this.task.totalAmount += this.work.rate.perSecond;

			this.onTick(this.task);
		}, 1000);
	}

	stop(): void {
		window.clearInterval(this.intervalId);
		this.task.status = 'paused';
		this.onTick(this.task);
	}
}
