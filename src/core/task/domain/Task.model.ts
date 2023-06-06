import { TaskId } from '@/core/task/domain/value-objects/TaskId.value';
import { TaskDescription } from '@/core/task/domain/value-objects/TaskDescription.value';
import { TaskSeconds } from '@/core/task/domain/value-objects/TaskSeconds.value';
import { TaskAmount } from '@/core/task/domain/value-objects/TaskAmount.value';
import { TaskDone } from '@/core/task/domain/value-objects/TaskDone.value';
import { TaskStatus } from '@/core/task/domain/value-objects/TaskStatus.value';
import { Work } from '@/core/work/domain/Work.model';

export class Task {
	id: TaskId;
	description: TaskDescription;
	seconds: TaskSeconds;
	amount: TaskAmount;
	done: TaskDone;
	status: TaskStatus;
	work: Work;

	private startTime!: number;
	private tickIntervalId!: number;

	constructor() {
		this.id = new TaskId();
		this.description = new TaskDescription();
		this.seconds = new TaskSeconds();
		this.amount = new TaskAmount();
		this.done = new TaskDone();
		this.status = new TaskStatus();
		this.work = new Work();
	}

	start(callback: (taskUpdated: Task) => void): void {
		this.startTime = Date.now();

		this.status.set('running');

		callback(this);

		this.tickIntervalId = window.setInterval(() => {
			const currentTime = Date.now();
			const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);

			this.seconds.set(elapsedTime);
			this.amount.set(this.seconds.get() * this.work.rate.perSecond.get());

			callback(this);
		}, 1000);
	}

	stop(callback: (taskUpdated: Task) => void): void {
		window.clearInterval(this.tickIntervalId);
		this.status.set('paused');

		callback(this);
	}

	setWork(work: Work): void {
		this.work = work;
	}
}
