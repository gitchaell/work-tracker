export interface TaskTimerStartProps {
	onStart: () => void;
	onTick: () => void;
}

export interface TaskTimerStopProps {
	onStop: () => void;
}

export class TaskTimer {
	private tickIntervalId!: number;

	start({ onStart, onTick }: TaskTimerStartProps): void {
		onStart();
		this.tickIntervalId = window.setInterval(() => onTick(), 1000);
	}

	stop({ onStop }: TaskTimerStopProps): void {
		window.clearInterval(this.tickIntervalId);
		onStop();
	}
}
