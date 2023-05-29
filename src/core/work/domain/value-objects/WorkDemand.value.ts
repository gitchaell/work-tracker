import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';
import { WorkDemandValues } from '@/core/work/domain/entities/Work.entity';

export class WorkDemand {
	private value: WorkDemandValues;

	constructor() {
		this.value = 'Normal';
	}

	get(): WorkDemandValues {
		return this.value;
	}

	set(value: WorkDemandValues): void {
		this.validate(value);
		this.value = this.safe(value);
	}

	private validate(value: WorkDemandValues): void {
		if (!value) {
			throw new ValidationError('Work demand is required');
		}

		if (typeof value !== 'string') {
			throw new ValidationError('Work demand must be a string');
		}

		if (!['Low', 'Normal', 'High'].includes(value)) {
			throw new ValidationError('Work demand must be "Low", "Normal", "High"');
		}
	}

	private safe(value: WorkDemandValues): WorkDemandValues {
		return value as WorkDemandValues;
	}
}
