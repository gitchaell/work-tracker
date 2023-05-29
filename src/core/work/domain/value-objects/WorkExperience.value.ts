import { ValidationError } from '@/core/common/helpers/ErrorHandlers.helper';
import { WorkExperienceValues } from '@/core/work/domain/entities/Work.entity';

export class WorkExperience {
	private value: WorkExperienceValues;

	constructor() {
		this.value = '0-1';
	}

	get(): WorkExperienceValues {
		return this.value;
	}

	set(value: WorkExperienceValues): void {
		this.validate(value);
		this.value = this.safe(value);
	}

	private validate(value: WorkExperienceValues): void {
		if (!value) {
			throw new ValidationError('Work experience is required');
		}

		if (typeof value !== 'string') {
			throw new ValidationError('Work experience must be a string');
		}

		if (!['0-1', '2-3', '4-5', '6-7', '8-9', '10+'].includes(value)) {
			throw new ValidationError('Work experience must be "0-1", "2-3", "4-5", "6-7", "8-9", "10+"');
		}
	}

	private safe(value: WorkExperienceValues): WorkExperienceValues {
		return value as WorkExperienceValues;
	}
}
