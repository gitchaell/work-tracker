export class TaskTimer {
	private tickIntervalId!: number;

	start({ onStart, onTick }: { onStart: () => void; onTick: () => void }): void {
		onStart();
		this.tickIntervalId = window.setInterval(() => onTick(), 1000);
	}

	stop({ onStop }: { onStop: () => void }): void {
		window.clearInterval(this.tickIntervalId);
		onStop();
	}
}
