import { FindWorksQuery } from '@/core/work/application/queries/FindWorks.query';
import { CreateWorkCommand } from '@/core/work/application/commands/CreateWork.command';
import { UpdateWorkCommand } from '@/core/work/application/commands/UpdateWork.command';
import { DeleteWorkCommand } from '@/core/work/application/commands/DeleteWork.command';

export class WorkService {
	static findWorks = FindWorksQuery.execute;
	static createWork = CreateWorkCommand.execute;
	static updateWork = UpdateWorkCommand.execute;
	static deleteWork = DeleteWorkCommand.execute;
}
