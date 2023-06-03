import { TaskId } from '@/core/task/domain/value-objects/TaskId.value';
import { TaskDescription } from '@/core/task/domain/value-objects/TaskDescription.value';
import { TaskSeconds } from '@/core/task/domain/value-objects/TaskSeconds.value';
import { TaskAmount } from '@/core/task/domain/value-objects/TaskAmount.value';
import { TaskDone } from '@/core/task/domain/value-objects/TaskDone.value';
import { TaskStatus } from '@/core/task/domain/value-objects/TaskStatus.value';
import { TaskTimer } from '@/core/task/domain/value-objects/TaskTimer.value';
import { Work } from '@/core/work/domain/Work.model';

export class Task {
	id: TaskId;
	description: TaskDescription;
	seconds: TaskSeconds;
	amount: TaskAmount;
	done: TaskDone;
	status: TaskStatus;
	work: Work;

	timer: TaskTimer;

	constructor() {
		this.id = new TaskId();
		this.description = new TaskDescription();
		this.seconds = new TaskSeconds();
		this.amount = new TaskAmount();
		this.done = new TaskDone();
		this.status = new TaskStatus();
		this.work = new Work();

		this.timer = new TaskTimer();
	}

	start(callback: (task: Task) => void): void {
		this.timer.start({
			onStart: () => {
				this.status.set('running');
				callback(this);
			},
			onTick: () => {
				this.seconds.add(1);
				this.amount.add(this.work.rate.perSecond.get());
				callback(this);
			},
		});
	}

	stop(callback: (task: Task) => void): void {
		this.timer.stop({
			onStop: () => {
				this.status.set('paused');
				callback(this);
			},
		});
	}

	setWork(work: Work): void {
		this.work = work;
	}
}
