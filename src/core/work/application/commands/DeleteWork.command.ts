import { DeleteWorkDTO } from '@/core/work/domain/Work.dto';
import { WorkRepository } from '@/core/work/infrastructure/Work.repository';
import { WorkMapper } from '@/core/work/application/helpers/WorkMapper.helper';
import { WorkDeletedEvent } from '@/core/work/application/events/WorkDeleted.event';
import { Work } from '@/core/work/domain/Work.entity';

export class DeleteWorkCommand {
	static execute(work: DeleteWorkDTO): Work {
		const workData = WorkMapper.toWork(work);

		const workDeleted = WorkRepository.delete(workData);

		WorkDeletedEvent.publish({ work: workDeleted });

		return workDeleted;
	}
}
