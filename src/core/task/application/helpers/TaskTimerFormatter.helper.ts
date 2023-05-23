import { NumberFormatter } from '@/core/common/helpers/NumberFormatter.helper';

export class TaskTimerFormatter {
	static toTimer(seconds: number): string {
		return NumberFormatter.toTimer(seconds * 1000);
	}
}
