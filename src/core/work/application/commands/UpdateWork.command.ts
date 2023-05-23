import { UpdateWorkDTO } from '@/core/work/domain/Work.dto';
import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkMapper } from '@/core/work/application/helpers/WorkMapper.helper';
import { WorkUpdatedEvent } from '@/core/work/application/events/WorkUpdated.event';
import { Work } from '@/core/work/domain/Work.entity';

export class UpdateWorkCommand {
	static execute(work: UpdateWorkDTO): Work {
		const workData = WorkMapper.toWork(work);

		const workUpdated = WorkRepository.update(workData);

		WorkUpdatedEvent.publish({ work: workUpdated });

		return workUpdated;
	}
}
