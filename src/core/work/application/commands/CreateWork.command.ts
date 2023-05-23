import { CreateWorkDTO } from '@/core/work/domain/Work.dto';
import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkMapper } from '@/core/work/application/helpers/WorkMapper.helper';
import { WorkCreatedEvent } from '@/core/work/application/events/WorkCreated.event';
import { Work } from '@/core/work/domain/Work.entity';

export class CreateWorkCommand {
	static execute(work: CreateWorkDTO): Work {
		const workData = WorkMapper.toWork(work);

		const workCreated = WorkRepository.create(workData);

		WorkCreatedEvent.publish({ work: workCreated });

		return workCreated;
	}
}
