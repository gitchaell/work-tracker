import { createContext } from 'react';

import { Work } from '@/core/work/domain/Work.entity';
import { CreateWorkDTO, DeleteWorkDTO, UpdateWorkDTO } from '@/core/work/domain/Work.dto';

interface WorkContextProps {
	works: Work[];
	workSelected: Work | null;
	findWorks: () => Work[];
	selectWork: (work: Work) => void;
	unselectWork: () => void;
	createWork: (work: CreateWorkDTO) => Work;
	updateWork: (work: UpdateWorkDTO) => Work;
	deleteWork: (work: DeleteWorkDTO) => Work;
}

export const WorkContext = createContext<WorkContextProps>({
	works: [],
	workSelected: null,
	findWorks: () => {
		throw new Error('findWorks() method not implemented.');
	},
	selectWork: () => {
		throw new Error('selectWork() method not implemented.');
	},
	unselectWork: () => {
		throw new Error('unselectWork() method not implemented.');
	},
	createWork: () => {
		throw new Error('createWork() method not implemented.');
	},
	updateWork: () => {
		throw new Error('updateWork() method not implemented.');
	},
	deleteWork: () => {
		throw new Error('deleteWork() method not implemented.');
	},
});
