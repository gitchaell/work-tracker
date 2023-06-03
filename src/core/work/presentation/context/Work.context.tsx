import { createContext } from 'react';

import { NotImplementedError } from '@/core/common/helpers/ErrorHandlers.helper';
import { Work } from '@/core/work/domain/Work.model';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';

interface WorkContextProps {
	works: Work[];
	workSelected: Work | null;
	findWorks: () => Work[];
	selectWork: (work: Work) => void;
	unselectWork: () => void;
	createWork: (work: Work | WorkEntity) => Work;
	updateWork: (work: Work | WorkEntity) => Work;
	deleteWork: (work: Work | WorkEntity) => Work;
}

export const WorkContext = createContext<WorkContextProps>({
	works: [],
	workSelected: null,
	findWorks: () => {
		throw new NotImplementedError('findWorks() method not implemented.');
	},
	selectWork: () => {
		throw new NotImplementedError('selectWork() method not implemented.');
	},
	unselectWork: () => {
		throw new NotImplementedError('unselectWork() method not implemented.');
	},
	createWork: () => {
		throw new NotImplementedError('createWork() method not implemented.');
	},
	updateWork: () => {
		throw new NotImplementedError('updateWork() method not implemented.');
	},
	deleteWork: () => {
		throw new NotImplementedError('deleteWork() method not implemented.');
	},
});
