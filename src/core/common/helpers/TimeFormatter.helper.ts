export class TimeFormatter {
	static format(milliseconds: number): string {
		const pad = (number: number) => number.toString().padStart(2, '0');

		const seconds = Math.floor(milliseconds / 1000) % 60;
		const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
		const hours = Math.floor(milliseconds / (1000 * 60 * 60));

		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}
}
