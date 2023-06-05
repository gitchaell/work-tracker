export class TimeFormatter {
	static format(ms: number): string {
		const pad = (number: number, length: number) => number.toString().padStart(length, '0');

		const date = new Date(ms);
		const hours = date.getUTCHours();
		const minutes = date.getUTCMinutes();
		const seconds = date.getUTCSeconds();

		return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
	}
}
