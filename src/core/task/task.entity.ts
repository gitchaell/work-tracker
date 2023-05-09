import { v4 as uuidv4 } from 'uuid';
import { WorkProfile } from '../work-profile';

export type TaskFilter = 'all' | 'pending' | 'done';

export interface TaskDto {
	description: string;
	workProfileId: string;
}

export class Task {
	id: string;
	description: string;
	totalSeconds: number;
	totalAmount: number;
	done: boolean;
	status: 'paused' | 'running';
	workProfileId: string;

	private intervalId!: number;

	constructor({ description, workProfileId }: TaskDto) {
		this.id = uuidv4();
		this.description = description;
		this.totalSeconds = 0;
		this.totalAmount = 0;
		this.done = false;
		this.status = 'paused';
		this.workProfileId = workProfileId;
	}

	start(workProfile: WorkProfile): void {
		this.status = 'running';
		console.log('Task started');
		this.intervalId = setInterval(() => {
			this.totalSeconds += 1;
			this.totalAmount += workProfile.rate.perSecond;
			console.log({
				totalSeconds: this.totalSeconds,
				totalAmount: this.totalAmount,
			});
		}, 1000);
	}

	stop(): void {
		console.log('Task stopped');
		this.status = 'paused';
		clearInterval(this.intervalId);
	}
}
